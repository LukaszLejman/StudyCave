package studycave.application;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@CrossOrigin
@RequestMapping("/sets")
@Api
public class SetController {

	@Autowired
	FlashcardRepository flashcardRepository;
	@Autowired
	SetRepository setRepository;
	@Autowired
	SimpleSetRepository simpleSetRepository;

	@GetMapping("/{id}")
	public Optional<Set> getSet(@PathVariable(required = true) Long id) {
		return setRepository.findById(id);
	}

	@GetMapping
	public List<SimpleSet> getSets() {
		return simpleSetRepository.findAll();
	}

	@PostMapping
	public void postSet(@RequestBody Set set) {
		for (Flashcard flashcard : set.getFlashcards())
			flashcard.setFlashcardSet(set);
		setRepository.save(set);
	}
	
	@PutMapping
	public void putSet(@RequestBody Set set) {
		Set oldset = setRepository.findById(set.getId()).orElse(null);
			set.setAddDate(oldset.getAddDate());
		for (Flashcard flashcard : set.getFlashcards())
			flashcard.setFlashcardSet(set);
			set.setEditDate();
			
		setRepository.save(set);
	}
}
