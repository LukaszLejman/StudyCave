package studycave.application.flashcard;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import studycave.application.badges.Badge;
import studycave.application.badges.BadgeRepository;
import studycave.application.groups.GroupRepository;
import studycave.application.user.User;
import studycave.application.user.UserBadge;
import studycave.application.user.UserBadgeRepository;
import studycave.application.user.UserRepository;

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
	UserRepository userRepository;
	@Autowired
	BadgeRepository badgeRepository;
	@Autowired
	UserBadgeRepository userBadgeRepository;
	@Autowired
	SimpleSetRepository simpleSetRepository;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	ModelMapper modelMapper;

	@GetMapping("/{id}")
	public SetOwnerDTO getSet(@PathVariable(required = true) Long id) {
		Set set = setRepository.findById(id).get();
		User user = userRepository.findById((long) set.getIdOwner()).get();

		SetOwnerDTO setDTO = modelMapper.map(set, SetOwnerDTO.class);
		setDTO.setOwner(user.getUsername());
		return setDTO;
	}

	@PutMapping("/{id}/permission")
	public void changePermission(@PathVariable(required = true) Long id, @RequestBody String permission) {
		Set set = setRepository.findById(id).get();
		set.setPermission(permission);
		setRepository.save(set);
	}

	@GetMapping("/{id}/permission")
	public String getPermission(@PathVariable(required = true) Long id) throws IOException {
		Set set = setRepository.findById(id).get();
		return set.getPermission();
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
		}
		return list;

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

	@GetMapping("/{id}/test/memory")
	public List<String> getMemoryTestFlashcards(@PathVariable(required = true) Long id) {
		List<String> list = new ArrayList<String>();
		List<String> segment = new ArrayList<String>();

		List<Flashcard> flashcards = setRepository.findById(id).get().getFlashcards();

		int segmentSize = 5;
		int setSize = flashcards.size();

		int i = 0;
		for (Flashcard flashcard : flashcards) {

			if (i == segmentSize) {
				i = 0;
				Collections.shuffle(segment);

				list.addAll(segment);
				segment.clear();

			}

			segment.add(flashcard.getLeftSide());
			segment.add(flashcard.getRightSide());

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
				segment.add(flashcard.getLeftSide());
				segment.add(flashcard.getRightSide());

				i++;
			}
		}

		Collections.shuffle(segment);

		list.addAll(segment);
		return list;
	}

	@GetMapping("/{id}/test/memory/check")
	public boolean checkMemoryTest(@PathVariable(required = true) Long id, @RequestParam(value = "x") String x,
			@RequestParam(value = "y") String y) {
		boolean result;

		if (setRepository.findResult(id, x, y) != 0)
			result = true;
		else
			result = false;

		return result;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteSet(@PathVariable(required = true) Long id) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long userId = userRepository.findByUsername(currentPrincipalName).get().getId();

		Optional<Set> set = setRepository.findById(id);
		if (set.isPresent()) {

			if (userId.equals((long) set.get().getIdOwner())) {
				setRepository.deleteById(id);
				return new ResponseEntity(HttpStatus.OK);
			}
		}
		return new ResponseEntity("Access Forbidden", HttpStatus.FORBIDDEN);
	}

	@GetMapping
	public ResponseEntity<?> getSets(@RequestParam(value = "owner", required = false) String owner,
			@RequestParam(value = "permission", required = false) String permission) {

		Optional<User> user = userRepository.findByUsername(owner);
		Integer ownerId = user.isPresent() ? user.get().getId().intValue() : null;

		if (owner != null && !user.isPresent())
			return new ResponseEntity<>(new String("User not found"), HttpStatus.NOT_FOUND);

		ArrayList<SimpleSetDTO> setDTOs = new ArrayList<SimpleSetDTO>();
		List<SimpleSet> sets = simpleSetRepository.findByOptionalPermissionAndOptionalOwner(permission, ownerId);

		for (SimpleSet set : sets) {
			String username = userRepository.findById((long) set.getIdOwner()).get().getUsername();
			SimpleSetDTO setDTO = modelMapper.map(set, SimpleSetDTO.class);
			setDTO.setOwner(username);
			if(set.getGroupId() != null)
			setDTO.setGroup(groupRepository.findById((long)set.getGroupId()).orElse(null).getName());
			setDTOs.add(setDTO);
		}
		return new ResponseEntity<List<SimpleSetDTO>>(setDTOs, HttpStatus.OK);
	}

	@PostMapping
	public void postSet(@RequestBody SetCreateDTO setDTO) {
		User user = userRepository.findByUsername(setDTO.getOwner()).get();

		setDTO.setIdOwner(user.getId());
		Set set = modelMapper.map(setDTO, Set.class);
		set.setId((long) 0);
		for (Flashcard flashcard : set.getFlashcards())
			flashcard.setFlashcardSet(set);
		set.setAddDate();
		set.setEditDate();
		
	// Badge for creating first test
		if(userBadgeRepository.findByIdAndUser((long)5, user.getId()).isEmpty()) {
		UserBadge badgeAchieved = new UserBadge();
		Badge badge = new Badge();
		badge = badgeRepository.findById((long)5).orElse(null);
		badgeAchieved.setBadge(badge);
		badgeAchieved.setUser(user);
		userBadgeRepository.save(badgeAchieved);
		}
		
		setRepository.save(set);
	}

	@DeleteMapping("flashcard/{id}")
	public void deleteFlashCard(@PathVariable(required = true) Long id) {
		flashcardRepository.deleteById(id);
	}

	@PutMapping
	public ResponseEntity putSet(@RequestBody SetOwnerDTO setDTO) {

		// Authorization
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long userId = userRepository.findByUsername(currentPrincipalName).get().getId();

		Optional<Set> originalSet = setRepository.findById(setDTO.getId());
		if (userId.equals((long) originalSet.get().getIdOwner())) {
			// pass

		} else
			return new ResponseEntity("Access Forbidden", HttpStatus.FORBIDDEN);

		//
		User user = userRepository.findByUsername(setDTO.getOwner()).get();
		setDTO.setIdOwner(user.getId());

		Set set = modelMapper.map(setDTO, Set.class);
		for (Flashcard flashcard : set.getFlashcards())
			flashcard.setFlashcardSet(set);

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

		return new ResponseEntity(HttpStatus.OK);
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
