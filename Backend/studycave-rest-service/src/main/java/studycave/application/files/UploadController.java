package studycave.application.files;

import java.util.ArrayList;
import java.util.List;
import com.opencsv.CSVReader;

import io.swagger.annotations.Api;
import studycave.application.Flashcard;
import studycave.application.FlashcardRepository;
import studycave.application.Set;
import studycave.application.SetRepository;
import studycave.application.files.MaterialRepository;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

import java.io.FileReader;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin; 

@Controller
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
	public ResponseEntity<String> handleFileUpload(@RequestBody SetsFileDTO setDTO,@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			storageService.store(file);
			files.add(file.getOriginalFilename());
			
			//wyczytywanie nazwy,kategorii,owner_id-----------------------------------------------------------------
			String path = "upload-dir/" + file.getOriginalFilename();
			CSVReader reader = new CSVReader(new FileReader(path));
            String[] line;
            line = reader.readNext();
            
            User user = userRepository.findByUsername(setDTO.getOwner()).get();
            
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
			
			
			uploadset.setPermission(setDTO.getPermission());
			
			
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
	public void handleFileSave(@RequestBody MaterialDTO materialDTO,@RequestParam("file") MultipartFile file){
		storageService.save(file);
		files.add(file.getOriginalFilename());
		String path = file.getOriginalFilename();
		Material material = modelMapper.map(materialDTO, Material.class);
		material.setPath(path);
		material.setPermission(materialDTO.getPermission());
		material.setTitle(materialDTO.getTitle());
		
		User user = userRepository.findByUsername(materialDTO.getOwner()).get();
		material.setOwner(Math.toIntExact(user.getId()));
		
		materialRepository.save(material);
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