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
	 
	@GetMapping("/{id}/info")
	public StudyGroup getGroupInfo(@PathVariable(required = true) Long id) {
		return this.groupService.getGroupInfo(id);
	}
		
	@DeleteMapping("/{group_id}/members/{user_id}")
	public ResponseEntity deleteUserFromGroup(@PathVariable(required = true) Long group_id, @PathVariable(required = true) Long user_id) {
		this.groupService.deleteUserFromGroup(group_id,user_id);
		return new ResponseEntity(HttpStatus.OK);
	}
}