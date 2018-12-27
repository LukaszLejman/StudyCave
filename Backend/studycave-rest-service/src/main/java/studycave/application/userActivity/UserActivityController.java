package studycave.application.userActivity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@RestController
@CrossOrigin
@Api
@PreAuthorize("isAuthenticated()")
public class UserActivityController {

	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/user/activity")
	public ResponseEntity<?> getUserActivity(
			@RequestParam(value = "startDate", required = false) String startDate,
			@RequestParam(value = "endDate", required = false) String endDate,
			@RequestParam(value = "sort", required = false) String sort
			) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		User user =  userRepository.findByUsername(currentPrincipalName).get();
		
		UserActivityDTO dto = new UserActivityDTO(Long.valueOf("1"), "type", 5, "comment", "27-12-2018", "resourceType", "resourceName", "firstUser", "secondUser");
		List<UserActivityDTO> list = new ArrayList<UserActivityDTO>();
		list.add(dto);
		list.add(dto);
		list.add(dto);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
}
