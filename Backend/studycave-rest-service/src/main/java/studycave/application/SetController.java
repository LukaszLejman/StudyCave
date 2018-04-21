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

	@GetMapping("/{id}/test/filling-in")
	public List<FlashcardTestDTO> getTestFlashcards(@PathVariable(required = true) Long id) {

		List<FlashcardTestDTO> list = new ArrayList<FlashcardTestDTO>();
		try {
			Set set = setRepository.findById(id).get();
			int random = 0;
			String content = null;
			String side = null;
			for (Flashcard flashcard : set.getFlashcards()) {
				random = (int) Math.round(Math.random());
				switch (random) {
				case 0:
					content = flashcard.getLeftSide();
					side = "left";
					break;
				case 1:
					content = flashcard.getRightSide();
					side = "right";
					break;
				}
				list.add(new FlashcardTestDTO(flashcard.getId(), content, side));
			}
			Collections.shuffle(list);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return list;
		}
	}

	@GetMapping("/{id}/test/pairing")
	public FlashcardPairingList getPairingTestFlashcards(@PathVariable(required = true) Long id) {
		FlashcardPairingList list = new FlashcardPairingList();
		List<FlashcardPairingDTO> left=new ArrayList<FlashcardPairingDTO>();
		List<FlashcardPairingDTO> right=new ArrayList<FlashcardPairingDTO>();
		
		Set set = setRepository.findById(id).get();
		for (Flashcard flashcard : set.getFlashcards()) {
			left.add(new FlashcardPairingDTO(flashcard.getId(), flashcard.getLeftSide()));
			right.add(new FlashcardPairingDTO(flashcard.getRightSide()));
		}
		list.setLeft(left);
		list.setRight(right);
		return list;
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
