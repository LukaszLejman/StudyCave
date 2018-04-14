package studycave.application;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/sets")
@Api
public class SetController {
	
	@Autowired
	FlashcardRepository flashcardRepository;
	
	@GetMapping("/{id}/flashcards")
	public List<Flashcard> getFlashcards(@PathVariable(required = true) Long id) {
		return flashcardRepository.findAll();
	}
}
