package studycave.application.groups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;


@RestController
@CrossOrigin
@Api
public class GroupController {

	@Autowired
	GroupService groupService;
	

//	@PreAuthorize("isAuthenticated()")
	 @PreAuthorize("#groupDto.owner == authentication.name")
	@PostMapping("/groups")
	public ResponseEntity<?> create(@RequestBody CreateGroupDto groupDto) {
		return this.groupService.createGroup(groupDto);
	}
	 
	@GetMapping("{group_id}/info")
	public GroupInfoDto getGroupInfo(@PathVariable(required = true) Long group_id) {
		return this.groupService.getGroupInfo(group_id);
	}
		
	@DeleteMapping("/{group_id}/member/{user_id}")
	public ResponseEntity deleteUserFromGroup(@PathVariable(required = true) Long group_id, @PathVariable(required = true) Long user_id) {
		return this.groupService.deleteUserFromGroup(group_id,user_id);
	}
	
	@DeleteMapping("/{group_id}")
	public ResponseEntity deleteGroup(@PathVariable(required = true) Long group_id) {
		return this.groupService.deleteGroup(group_id);
	}
	
	@GetMapping("/{group_id}/generate")
	public String generateCode(@PathVariable(required = true) Long group_id) {
		return this.groupService.generateCode(group_id);
	}
}