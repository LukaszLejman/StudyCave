package studycave.application.user;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import studycave.application.files.Material;
import studycave.application.files.MaterialGetDTO;
import studycave.application.files.MaterialRepository;
import studycave.application.flashcard.SimpleSet;
import studycave.application.flashcard.SimpleSetDTO;
import studycave.application.flashcard.SimpleSetRepository;
import studycave.application.groups.members.StudyGroupMemberRepository;
import studycave.application.test.SimpleTest;
import studycave.application.test.SimpleTestDTO;
import studycave.application.test.SimpleTestRepository;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@Api
public class UserContentController {

	@Autowired
	UserRepository userRepository;
	@Autowired
	StudyGroupMemberRepository memberRepository;
	@Autowired
	SimpleSetRepository simpleSetRepository;
	@Autowired
	SimpleTestRepository simpleTestRepository;
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	MaterialRepository materialRepository;

	@GetMapping("/users/sets")
	public ResponseEntity<?> getUserSets(@RequestParam(value = "excludedGroupId", required = false) String groupId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Optional<User> user = userRepository.findByUsername(currentPrincipalName);
		Integer ownerId = user.isPresent() ? user.get().getId().intValue() : null;
		if (!user.isPresent())
			return new ResponseEntity<>(new String("User not found"), HttpStatus.NOT_FOUND);

		ArrayList<SimpleSetDTO> setDTOs = new ArrayList<SimpleSetDTO>();
		List<SimpleSet> sets = simpleSetRepository.findByOptionalPermissionAndOptionalOwner(null, ownerId);

		for (SimpleSet set : sets) {
			Boolean isInGroup = false;
			for (SimpleSet set2 : sets) {
				if (groupId != null && set.getName().equals(set2.getName()) && set != set2) {
					if (set.getGroupId() != null && set.getGroupId() == Integer.parseInt(groupId)) {
						isInGroup = true;
						break;
					}

					if (set2.getGroupId() != null && set2.getGroupId() == Integer.parseInt(groupId)) {
						isInGroup = true;
						break;
					}
				}
			}
			if (!isInGroup) {
				SimpleSetDTO setDTO = modelMapper.map(set, SimpleSetDTO.class);
				setDTO.setOwner(currentPrincipalName);
				setDTOs.add(setDTO);
			}
		}
		return new ResponseEntity<List<SimpleSetDTO>>(setDTOs, HttpStatus.OK);
	}

	@GetMapping("/users/materials")
	public ResponseEntity<?> getUserMaterials(
			@RequestParam(value = "excludedGroupId", required = false) String groupId) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Optional<User> user = userRepository.findByUsername(currentPrincipalName);
		Integer ownerId = user.isPresent() ? user.get().getId().intValue() : null;
		if (!user.isPresent())
			return new ResponseEntity<>(new String("User not found"), HttpStatus.NOT_FOUND);

		ArrayList<MaterialGetDTO> materialDTOs = new ArrayList<MaterialGetDTO>();
		List<Material> materials = materialRepository.findByOptionalPermissionAndOptionalOwner(null, ownerId);

		for (Material material : materials) {
			Boolean isInGroup = false;
			for (Material material2 : materials) {
				if (groupId != null && material.getTitle().equals(material2.getTitle()) && material != material2) {
					if (material.getGroup() != null && material.getGroup().getId() == Integer.parseInt(groupId)) {
						isInGroup = true;
						break;
					}

					if (material2.getGroup() != null && material2.getGroup().getId() == Integer.parseInt(groupId)) {
						isInGroup = true;
						break;
					}
				}
			}
			if (!isInGroup) {
				MaterialGetDTO materialDTO = modelMapper.map(material, MaterialGetDTO.class);
				materialDTO.setOwner(currentPrincipalName);
				materialDTOs.add(materialDTO);

			}
		}
		return new ResponseEntity<List<MaterialGetDTO>>(materialDTOs, HttpStatus.OK);
	}

	@GetMapping("/users/tests")
	public ResponseEntity<?> getUserTests(
			@RequestParam(value = "excludedGroupId", required = false) String groupId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Optional<User> user = userRepository.findByUsername(currentPrincipalName);
		Integer ownerId = user.isPresent() ? user.get().getId().intValue() : null;
		if (!user.isPresent())
			return new ResponseEntity<>(new String("User not found"), HttpStatus.NOT_FOUND);

		ArrayList<SimpleTestDTO> testDTOs = new ArrayList<SimpleTestDTO>();
		List<SimpleTest> tests = simpleTestRepository.findByOptionalPermissionAndOptionalOwner(null, new Long(ownerId));

		for (SimpleTest test : tests) {
			Boolean isInGroup = false;
			for (SimpleTest test2 : tests) {
				if (groupId != null && test.getTitle().equals(test2.getTitle()) && test != test2) {
					if (test.getGroupId() != null && test.getGroupId() == Integer.parseInt(groupId)) {
						isInGroup = true;
						break;
					}

					if (test2.getGroupId() != null && test2.getGroupId() == Integer.parseInt(groupId)) {
						isInGroup = true;
						break;
					}
				}
			}
			if (!isInGroup) {
				SimpleTestDTO testDTO = modelMapper.map(test, SimpleTestDTO.class);
				testDTO.setOwner(currentPrincipalName);
				testDTOs.add(testDTO);

			}
		}
		return new ResponseEntity<List<SimpleTestDTO>>(testDTOs, HttpStatus.OK);
	}
}
