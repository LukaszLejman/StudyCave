package studycave.application.groups;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import studycave.application.groups.members.SimpleStudyGroupMemberDTO;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.user.UserRepository;


@RestController
@CrossOrigin
@RequestMapping("/groups")
@Api
public class GroupController {

	@Autowired
	GroupService groupService;
	@Autowired
	UserRepository userRepository;

//	@PreAuthorize("isAuthenticated()")
	@PreAuthorize("#groupDto.owner == authentication.name")
	@PostMapping()
	public ResponseEntity<?> create(@RequestBody CreateGroupDto groupDto) {
		return this.groupService.createGroup(groupDto);
	}
	
	@GetMapping()
	//public List<SimpleStudyGroupMemberDTO> getMyGroup(@RequestHeader (value = "Authorization",required = false) String headerStr) {
	public List<SimpleStudyGroupMemberDTO> getMyGroup() {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String currentPrincipalName = authentication.getName();
			Long id = userRepository.findByUsername(currentPrincipalName).get().getId();
			return this.groupService.getMyGroups(id);
	}	
	
	@PostMapping("/{groupName}/members")
	public ResponseEntity<?> addmember(@PathVariable(required = true) String groupName, @RequestBody GroupJoinDto groupDto) {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String currentPrincipalName = authentication.getName();
			Long userId = userRepository.findByUsername(currentPrincipalName).get().getId();
			return this.groupService.joinToGroup(userId, groupDto.getGroupCode(), groupName);
	}	
}