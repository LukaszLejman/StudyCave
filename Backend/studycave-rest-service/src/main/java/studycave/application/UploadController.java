package studycave.application;

import java.util.ArrayList;
import java.util.List;
import com.opencsv.CSVReader;
import java.io.FileReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin; 

@Controller
@CrossOrigin
public class UploadController {
 
	@Autowired
	StorageService storageService;
	@Autowired
	FlashcardRepository flashcardRepository;
	@Autowired
	SetRepository setRepository;
	
	
	List<String> files = new ArrayList<String>();
 
	@PostMapping("/file/upload")
	public ResponseEntity<String> handleFileUpload(@RequestParam("id") int id,@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			storageService.store(file);
			files.add(file.getOriginalFilename());
			
			//wyczytywanie nazwy,kategorii,owner_id-----------------------------------------------------------------
			String path = "upload-dir/" + file.getOriginalFilename();
			CSVReader reader = new CSVReader(new FileReader(path));
            String[] line;
            line = reader.readNext();
            Set uploadset = new Set(line[0],line[1],id);
            
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