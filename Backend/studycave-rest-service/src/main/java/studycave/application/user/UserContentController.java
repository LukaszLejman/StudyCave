package studycave.application.user;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

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
import studycave.application.files.MaterialGetDTO;
import studycave.application.flashcard.SimpleSetDTO;
import studycave.application.groups.members.StudyGroupMemberRepository;
import studycave.application.test.SimpleTestDTO;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@Api
public class UserContentController {

	@Autowired
	UserRepository userRepository;
	@Autowired
	StudyGroupMemberRepository memberRepository;	
	
	@GetMapping("/users/sets")
	public ResponseEntity<List<SimpleSetDTO>> getUserSets(
			@RequestParam(value = "excludedGroupId", required = false) String groupId ){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
//		Long id = userRepository.findByUsername(currentPrincipalName).get().getId();
		ArrayList<SimpleSetDTO> list = new ArrayList<SimpleSetDTO>();
		SimpleSetDTO sampleValue = new SimpleSetDTO();
		sampleValue.setAddDate(new Date(Calendar.getInstance().getTime().getTime()));
		sampleValue.setEditDate(new Date(Calendar.getInstance().getTime().getTime()));
		sampleValue.setGrade(1);
		sampleValue.setId(Long.valueOf("1"));
		sampleValue.setCategory("category");
		sampleValue.setOwner("username");
		sampleValue.setPermission("public");
		sampleValue.setName("title");
		list.add(sampleValue);
		return new ResponseEntity<List<SimpleSetDTO>>(list, HttpStatus.OK);
	}
	
	@GetMapping("/users/materials")
	public ResponseEntity<List<MaterialGetDTO>> getUserMaterials(
			@RequestParam(value = "excludedGroupId", required = false) String groupId ){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
//		Long id = userRepository.findByUsername(currentPrincipalName).get().getId();
		ArrayList<MaterialGetDTO> list = new ArrayList<MaterialGetDTO>();
		MaterialGetDTO sampleValue = new MaterialGetDTO();
		sampleValue.setAddDate(new Date(Calendar.getInstance().getTime().getTime()));
		sampleValue.setEditDate(new Date(Calendar.getInstance().getTime().getTime()));
		sampleValue.setGrade(1);
		sampleValue.setId(Long.valueOf("1"));
		sampleValue.setOwner("username");
		sampleValue.setPermission("public");
		sampleValue.setTitle("title");
		list.add(sampleValue);
		return new ResponseEntity<List<MaterialGetDTO>>(list, HttpStatus.OK);
	}
	
	@GetMapping("/users/tests")
	public ResponseEntity<List<SimpleTestDTO>> getUserTests(
			@RequestParam(value = "excludedGroupId", required = false) String groupId ){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
//		Long id = userRepository.findByUsername(currentPrincipalName).get().getId();
		ArrayList<SimpleTestDTO> list = new ArrayList<SimpleTestDTO>();
		SimpleTestDTO sampleValue = new SimpleTestDTO();
		sampleValue.setAddDate(new Date(Calendar.getInstance().getTime().getTime()));
		sampleValue.setEditDate(new Date(Calendar.getInstance().getTime().getTime()));
		sampleValue.setGrade(Long.valueOf("1"));
		sampleValue.setId(Long.valueOf("1"));
		sampleValue.setIdOwner(Long.valueOf("1"));
		sampleValue.setOwner("username");
		sampleValue.setPermission("public");
		sampleValue.setTitle("title");
		list.add(sampleValue);
		return new ResponseEntity<List<SimpleTestDTO>>(list, HttpStatus.OK);
	}
	
}
