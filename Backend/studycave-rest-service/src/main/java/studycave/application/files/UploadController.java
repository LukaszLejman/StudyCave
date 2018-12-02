package studycave.application.files;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.Resource;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.opencsv.CSVReader;

import io.swagger.annotations.Api;
import studycave.application.flashcard.Flashcard;
import studycave.application.flashcard.FlashcardRepository;
import studycave.application.flashcard.Set;
import studycave.application.flashcard.SetRepository;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@RestController
@CrossOrigin
@RequestMapping("/file")
@Api
public class UploadController {
 
	@Autowired
	StorageService storageService;
	@Autowired
	FlashcardRepository flashcardRepository;
	@Autowired
	SetRepository setRepository;
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	MaterialRepository materialRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	S3ServicesImpl amazonFolder;
	@Autowired
	private AmazonS3 s3client;

	private String bucketName = "studycave-folder";
	
	List<String> files = new ArrayList<String>();
 
	@PostMapping("/upload")
	public ResponseEntity<String> handleFileUpload(@RequestParam String owner,@RequestParam String permission,@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			storageService.store(file);
			files.add(file.getOriginalFilename());
			
			//wyczytywanie nazwy,kategorii,owner_id-----------------------------------------------------------------
			String path = "upload-dir/" + file.getOriginalFilename();
			CSVReader reader = new CSVReader(new FileReader(path));
            String[] line;
            line = reader.readNext();
            
            User user = userRepository.findByUsername(owner).get();
            
            Set uploadset = new Set(line[0],line[1],Math.toIntExact(user.getId()));
            
            //addDate,editDate---------------------------------------------------------------------------------------
            uploadset.setAddDate();
			uploadset.setEditDate();
			
			//Flashcards----------------------------------------------------------------------------------------------
			List<Flashcard> uploadflashcards = new ArrayList<Flashcard>();
			while ((line = reader.readNext()) != null){
				Flashcard uploadflashcard = new Flashcard(line[0],line[1]);
				uploadflashcards.add(uploadflashcard);
			}
			
			reader.close();
			storageService.deleteAll();
			storageService.init();
			uploadset.setFlashcards(uploadflashcards);
			
			uploadset.setPermission(permission);
			
			for (Flashcard uploadflashcard : uploadset.getFlashcards())
				uploadflashcard.setFlashcardSet(uploadset);
			setRepository.save(uploadset);
			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
			storageService.deleteAll();
			storageService.init();
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
			
		}	
	}
	
	@PostMapping("/save")//----------------------------------------------- file save
	public ResponseEntity<String> handleFileSave(@RequestParam String owner,@RequestParam String permission,@RequestParam String title,@RequestParam int grade, @RequestParam("file") MultipartFile file){
		String msg ="";
		try {
		DateFormat currentDate = new SimpleDateFormat("MM.dd.yyyy.HH.mm.ss");
		Date today = Calendar.getInstance().getTime();
		storageService.save(file);
		File convFile = new File(System.getProperty("java.io.tmpdir") + System.getProperty("file.separator") +file.getOriginalFilename());
		file.transferTo(convFile);
		s3client.putObject(new PutObjectRequest(bucketName,currentDate.format(today) + file.getOriginalFilename() , convFile).withCannedAcl(CannedAccessControlList.PublicRead));
		
		String filepath = "save-dir\\" + file.getOriginalFilename();
		
		files.add(file.getOriginalFilename());
		Material material = new Material();
		
		
		
		java.util.Date utilDate = new java.util.Date();
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		
		material.setPermission(permission);
		material.setTitle(title);
		material.setAddDate(sqlDate);
		material.setEditDate(sqlDate);
		material.setGrade(grade);
		User user = userRepository.findByUsername(owner).get();
		material.setOwner(Math.toIntExact(user.getId()));
		
		File newfile = new File(filepath);
		String newfilepath = "save-dir\\" + currentDate.format(today) + file.getOriginalFilename();
		File newfilename = new File(newfilepath);
		newfile.renameTo(newfilename);
		String simplepath = currentDate.format(today) + file.getOriginalFilename();
		material.setPath(simplepath);
		materialRepository.save(material);
		//amazonFolder.uploadFile(material.getPath(),"save-dir\\" + material.getPath());
		msg = "You successfully uploaded " + file.getOriginalFilename() + "!";
		return ResponseEntity.status(HttpStatus.OK).body(msg);
		}catch(Exception e) {
			e.printStackTrace();
			msg = "FAIL to upload " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(msg);
		}
	}
	
	@GetMapping("/materials")
	public ResponseEntity<?> getMaterials(
			@RequestParam(value = "owner", required = false) String  owner,
            @RequestParam(value = "permission", required = false) String permission) {
		Optional<User> user = userRepository.findByUsername(owner);
		Integer ownerId = user.isPresent() ? user.get().getId().intValue() : null;
		
		if (owner!=null && !user.isPresent()) return new ResponseEntity<>(new String("User not found"),HttpStatus.NOT_FOUND);

		
		ArrayList<MaterialGetDTO> materialDTOs = new ArrayList<MaterialGetDTO>();
		List<Material> materials = materialRepository.findByOptionalPermissionAndOptionalOwner(permission,ownerId);
		
		for(Material material : materials) {
			String username = userRepository.findById((long) material.getOwner()).get().getUsername();
			MaterialGetDTO materialDTO = modelMapper.map(material, MaterialGetDTO.class);
		    materialDTO.setOwner(username);
		    materialDTOs.add(materialDTO);
		}
		return new ResponseEntity<List<MaterialGetDTO>>(materialDTOs, HttpStatus.OK);
	}
	
	@PutMapping("materials/{id}/permission")
	public void changePermission(@PathVariable(required = true) Long id, @RequestBody String permission) {
		Material material = materialRepository.findById(id).get();
		material.setPermission(permission);
		materialRepository.save(material);
	}

	@GetMapping("materials/{id}/permission")
	public ResponseEntity<String> getPermission(@PathVariable(required = true) Long id) throws IOException {
		Material material = materialRepository.findById(id).get();
		return ResponseEntity.status(HttpStatus.OK).body(material.getPermission());
		//return material.getPermission();
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deletematerial(@PathVariable(required = true)Long id) {
		
		//Authorization
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long userId = userRepository.findByUsername(currentPrincipalName).get().getId();

		System.out.println();
		
		if (!userId.equals((long)materialRepository.findById(id).get().getOwner())) {
				return new ResponseEntity("Access Forbidden", HttpStatus.FORBIDDEN);
		}
		//
		
		storageService.savedelete((materialRepository.findById(id).orElse(null)).getPath());
		materialRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("usunieto");
	}
	
	@GetMapping("/files/{id}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable(required = true) Long id) {
		Material material = materialRepository.findById(id).orElse(null);
//		ResourceLoader rl = new DefaultResourceLoader();
//		Resource file = rl.getResource("url:https://s3-eu-west-1.amazonaws.com/studycave-folder/" + material.getPath());
	
		// ------------------------------------------------------------------------- LOCAL
		Resource file = storageService.loadFile(material.getPath()); 
		
		
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}
 /*
	@GetMapping("/file/getall")
	public ResponseEntity<List<String>> getListFiles(Model model) {
		List<String> fileNames = files
				.stream().map(fileName -> MvcUriComponentsBuilder
						.fromMethodName(UploadController.class, "getFile", fileName).build().toString())
				.collect(Collectors.toList());
 
		return ResponseEntity.ok().body(fileNames);
	}
 
	@GetMapping("/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.loadFile(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}*/
}