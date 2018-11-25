package studycave.application.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import studycave.application.groups.members.SimpleStudyGroupMemberDTO;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.groups.members.StudyGroupMemberRepository;

@RestController
@CrossOrigin
@Api
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	StudyGroupMemberRepository memberRepository;	
	@Autowired 
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping("/user/register")
	public String Register(@RequestBody User user) {
		if(userRepository.findByUsername(user.getUsername()).orElse(null)!=null)
			return "Login zajety";
		if(userRepository.findByEmail(user.getEmail()).orElse(null)!=null)
			return "Email zajety";
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return "Dodano uzytkonika";
	}
	
	@GetMapping("/user/{username}")
	public ResponseEntity<?> getInfo(
			@PathVariable(required = true)String username) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		User user =  userRepository.findByUsername(username).get();
		if (currentPrincipalName.equals(username)) return new ResponseEntity<User>(user,HttpStatus.OK);
		else return new ResponseEntity("Access Forbidden",HttpStatus.FORBIDDEN);
		
	}
	
	@PutMapping("/user/info/update")
	public String updateUser(@RequestBody User user) {
		User finduser = userRepository.findByUsername(user.getUsername()).orElse(null);
		if(finduser!=null)
			if(finduser.getId()!=user.getId())
			return "Login zajety";
		finduser = userRepository.findByEmail(user.getEmail()).orElse(null);
		if(finduser!=null)
			if(finduser.getId()!=user.getId())
			return "Email zajety";
		if(user.getPassword() == null)
			user.setPassword(userRepository.findById(user.getId()).orElse(null).getPassword());
		else
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return "Edycja udana";
	}
	
    @ApiOperation("Login.")
    @PostMapping("/login")
    public void fakeLogin( //show in Swagger 
    		@RequestBody UserLoginDTO user){
        throw new IllegalStateException("This method shouldn't be called. It's implemented by Spring Security filters.");
    }
	
}
