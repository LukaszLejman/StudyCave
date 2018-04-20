package studycave.application;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

	@GetMapping("/{id}/test")
	public List<FlashcardTestDTO> getTestFlashcards(@PathVariable(required = true) Long id) {

		List<FlashcardTestDTO> list = new ArrayList<FlashcardTestDTO>();
		try {
			Set set = setRepository.findById(id).get();
			int random = 0;
			for (Flashcard flashcard : set.getFlashcards()) {
				random = (int) Math.round(Math.random());
				FlashcardTestDTO flashcardDTO = new FlashcardTestDTO();
				flashcardDTO.setId(flashcard.getId());
				switch (random) {
				case 0:
					flashcardDTO.setLeftSide(flashcard.getLeftSide());
					break;
				case 1:
					flashcardDTO.setRightSide(flashcard.getRightSide());
					break;
				}
				//list.add(new FlashcardTestDTO(flashcard.getId(), content));
				list.add(flashcardDTO);
			}
			Collections.shuffle(list);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return list;
		}
	}

	@DeleteMapping("/{id}")
	public void deleteSet(@PathVariable(required = true) Long id) {
		setRepository.deleteById(id);
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
