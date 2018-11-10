package studycave.application.groups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}