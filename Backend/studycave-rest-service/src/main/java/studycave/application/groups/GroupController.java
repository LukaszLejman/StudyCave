package studycave.application.groups;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import studycave.application.groups.members.SimpleStudyGroupMemberDTO;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.groups.members.StudyGroupMemberRepository;
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
	@Autowired
	StudyGroupMemberRepository memberRepository;

//	@PreAuthorize("isAuthenticated()")
	@PreAuthorize("#groupDto.owner == authentication.name")
	@PostMapping()
	public ResponseEntity<?> create(@RequestBody CreateGroupDto groupDto) {
		return this.groupService.createGroup(groupDto);
	}

	 
	@GetMapping("{group_id}/info")
	public GroupInfoDto getGroupInfo(@PathVariable(required = true) Long group_id) {
		return this.groupService.getGroupInfo(group_id);
	}
		
	@DeleteMapping("/{group_id}/member/{user_id}")
	public ResponseEntity deleteUserFromGroup(@PathVariable(required = true) Long group_id, @PathVariable(required = true) Long user_id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long id = userRepository.findByUsername(currentPrincipalName).get().getId();
		if(this.memberRepository.findUserInGroup(group_id, id).getIsGroupLeader() == true)
			return this.groupService.deleteUserFromGroup(group_id,user_id);
		else
			return new ResponseEntity<>("Brak uprawnien do operacji", HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{group_id}")
	public ResponseEntity deleteGroup(@PathVariable(required = true) Long group_id) {
		return this.groupService.deleteGroup(group_id);
	}
	
	@GetMapping("/{group_id}/generate")
	public ResponseEntity generateCode(@PathVariable(required = true) Long group_id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		Long id = userRepository.findByUsername(currentPrincipalName).get().getId();
		if(this.memberRepository.findUserInGroup(group_id, id).getIsGroupLeader() == true)
			return this.groupService.generateCode(group_id);
		else
			return new ResponseEntity<>("Brak uprawnien do operacji", HttpStatus.BAD_REQUEST);
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