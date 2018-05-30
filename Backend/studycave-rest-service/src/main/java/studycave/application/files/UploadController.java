package studycave.application.files;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.opencsv.CSVReader;

import io.swagger.annotations.Api;
import studycave.application.Flashcard;
import studycave.application.FlashcardRepository;
import studycave.application.Set;
import studycave.application.SetRepository;
import studycave.application.SimpleSet;
import studycave.application.SimpleSetDTO;
import studycave.application.files.MaterialRepository;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable; 

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
	
	@PostMapping("/save")
	public ResponseEntity<String> handleFileSave(@RequestParam String owner,@RequestParam String permission,@RequestParam String title,@RequestParam("file") MultipartFile file){
		String msg ="";
		try {
		DateFormat currentDate = new SimpleDateFormat("MM.dd.yyyy.HH.mm.ss");
		Date today = Calendar.getInstance().getTime();  
		storageService.save(file);
		String filepath = "save-dir\\" + file.getOriginalFilename();
		
		files.add(file.getOriginalFilename());
		Material material = new Material();
		
		material.setPermission(permission);
		material.setTitle(title);
		
		User user = userRepository.findByUsername(owner).get();
		material.setOwner(Math.toIntExact(user.getId()));
		
		File newfile = new File(filepath);
		String newfilepath = "save-dir\\" + currentDate.format(today) + file.getOriginalFilename();
		File newfilename = new File(newfilepath);
		newfile.renameTo(newfilename);
		String simplepath = currentDate.format(today) + file.getOriginalFilename();
		material.setPath(simplepath);
		materialRepository.save(material);
		msg = "You successfully uploaded " + file.getOriginalFilename() + "!";
		return ResponseEntity.status(HttpStatus.OK).body(msg);
		}catch(Exception e) {
			e.printStackTrace();
			msg = "FAIL to upload " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(msg);
		}
	}
	
	@GetMapping("/materials")
	public ArrayList<MaterialGetDTO> getMaterials(
			@RequestParam(value = "owner", required = false) String  owner,
            @RequestParam(value = "permission", required = false) String permission) {
		Optional<User> user = userRepository.findByUsername(owner);
		Integer ownerId = user.isPresent() ? user.get().getId().intValue() : null;
		ArrayList<MaterialGetDTO> materialDTOs = new ArrayList<MaterialGetDTO>();
		
		List<Material> materials = materialRepository.findByOptionalPermissionAndOptionalOwner(permission,ownerId);
		
		for(Material material : materials) {
			String username = userRepository.findById((long) material.getOwner()).get().getUsername();
			MaterialGetDTO materialDTO = modelMapper.map(material, MaterialGetDTO.class);
		    materialDTO.setOwner(username);
		    materialDTOs.add(materialDTO);
		}
		return materialDTOs;
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
		storageService.savedelete((materialRepository.findById(id).orElse(null)).getPath());
		materialRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("usunieto");
	}
	
	@GetMapping("/files/{id}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable(required = true) Long id) {
		Material material = materialRepository.findById(id).orElse(null);
		
		Resource file = storageService.loadFile(material.getPath());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
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