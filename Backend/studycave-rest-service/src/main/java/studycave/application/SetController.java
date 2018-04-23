package studycave.application;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

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
		List<FlashcardPairingDTO> left = new ArrayList<FlashcardPairingDTO>();
		List<FlashcardPairingDTO> right = new ArrayList<FlashcardPairingDTO>();

		List<FlashcardPairingDTO> segmentLeft = new ArrayList<FlashcardPairingDTO>();
		List<FlashcardPairingDTO> segmentRight = new ArrayList<FlashcardPairingDTO>();

		try {
			List<Flashcard> flashcards = setRepository.findById(id).get().getFlashcards();

			int segmentSize = 5;
			int setSize = flashcards.size();

			int i = 0;
			for (Flashcard flashcard : flashcards) {

				if (i == segmentSize) {
					i = 0;
					Collections.shuffle(segmentLeft);
					Collections.shuffle(segmentRight);

					left.addAll(segmentLeft);
					right.addAll(segmentRight);
					segmentLeft.clear();
					segmentRight.clear();

				}

				segmentLeft.add(new FlashcardPairingDTO(flashcard.getId(), flashcard.getLeftSide()));
				segmentRight.add(new FlashcardPairingDTO(flashcard.getRightSide()));

				i++;
			}

			List<Integer> visited = new ArrayList<Integer>();

			if (setSize > 5) {
				while (i < segmentSize) {
					int range = ((setSize / segmentSize) * segmentSize) - 1;

					int random = ThreadLocalRandom.current().nextInt(0, range + 1);
					while (visited.contains(random)) {
						random = ThreadLocalRandom.current().nextInt(0, range + 1);
					}
					visited.add(random);

					Flashcard flashcard = flashcards.get(random);
					segmentLeft.add(new FlashcardPairingDTO(flashcard.getId(), flashcard.getLeftSide()));
					segmentRight.add(new FlashcardPairingDTO(flashcard.getRightSide()));

					i++;
				}
			}

			Collections.shuffle(segmentLeft);
			Collections.shuffle(segmentRight);

			left.addAll(segmentLeft);
			right.addAll(segmentRight);

			list.setLeft(left);
			list.setRight(right);
			return list;
		} catch (Exception e) {
			return null;
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
		set.setAddDate();
		set.setEditDate();
		setRepository.save(set);
	}

	@DeleteMapping("flashcard/{id}")
	public void deleteFlashCard(@PathVariable(required = true) Long id) {
		flashcardRepository.deleteById(id);
	}

	@PutMapping
	public void putSet(@RequestBody Set set) {
		List<Long> delete = new ArrayList<>();
		Set oldset = setRepository.findById(set.getId()).orElse(null);
		set.setAddDate(oldset.getAddDate());
		set.setGrade(oldset.getGrade());
		set.setEditDate();

		Boolean isin = false;

		for (Flashcard oldflashcard : oldset.getFlashcards()) {
			isin = false;
			for (Flashcard flashcard : set.getFlashcards()) {
				if (oldflashcard.getId() == flashcard.getId())
					isin = true;
			}
			if (isin == false) {
				delete.add(oldflashcard.getId());
			}
		}
		setRepository.save(set);
		for (Long n : delete)
			if (n != null)
				if (flashcardRepository.findById(n) != null)
					flashcardRepository.deleteById(n);
	}

	@GetMapping("/{setid}/{id}/{content}/{side}/test/check")
	public TestResult checkFCTest(@PathVariable(required = true) Long setid, @PathVariable(required = true) Long id,
			@PathVariable(required = true) String content, @PathVariable(required = true) String side) {
		TestResult result = new TestResult();
		result.setId(id);
		List<Flashcard> testset = (setRepository.findById(setid).orElse(null)).getFlashcards();
		for (Flashcard y : testset) {
			if (id == y.getId())
				if (side.equals("left")) {
					if (content.equals(y.getRightSide())) {
						result.setResult(true);
						System.out.println("prawa sie zgadza");
						return result;

					} else {
						result.setResult(false);
						System.out.println("prawa sie nie zgadza");
						return result;
					}
				} else {
					if (content.equals(y.getLeftSide())) {
						result.setResult(true);
						System.out.println("lewa sie zgadza");
						return result;
					} else {
						result.setResult(false);
						System.out.println("lewa sie nie zgadza");
						return result;
					}
				}
		}
		System.out.println("nie znalazlem id: " + id);
		return result;
	}
}
