package studycave.application.user;
import java.util.ArrayList;
import java.util.List;

import javax.swing.ImageIcon;

import org.modelmapper.ModelMapper;
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
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import studycave.application.groups.members.StudyGroupMemberRepository;
import studycave.application.test.Test;

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
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping("/user/register")
	public String Register(@RequestBody UserRegisterDTO userDTO) {
		if(userRepository.findByUsername(userDTO.getUsername()).orElse(null)!=null)
			return "Login zajety";
		if(userRepository.findByEmail(userDTO.getEmail()).orElse(null)!=null)
			return "Email zajety";
		userDTO.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
		User user = modelMapper.map(userDTO, User.class);
		
		userRepository.save(user);
		return "Dodano uzytkownika";
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

	@GetMapping("/user/badges")
	public ResponseEntity<List<UserBadgeDTO>> getUserBadges() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		System.out.println(currentPrincipalName);
		List<UserBadgeDTO> badges = new ArrayList<>();
//		java.net.URL imgURL = getClass().getResource("C:/Users/Dawid/Documents/GitHub/StudyCave/Backend/studycave-rest-service/badge-icons/star.png");
//		ImageIcon icon = new ImageIcon(imgURL,"star");
		
		UserBadgeDTO badge1 = new UserBadgeDTO();
		
		badge1.setBadgeName("Utworzyłeś konto!");
		badge1.setUnlocked(true);
		badges.add(badge1);
		
		UserBadgeDTO badge2 = new UserBadgeDTO();
		badge2.setBadgeName("Zdobyłeś 50 punktów");
		badge2.setUnlocked(true);
		badges.add(badge2);
		
		UserBadgeDTO badge3 = new UserBadgeDTO();
		badge3.setBadgeName("Zdobyłeś 10 000 punktów");
		badge3.setUnlocked(false);
		badges.add(badge3);
		
		return new ResponseEntity<List<UserBadgeDTO>>(badges, HttpStatus.OK);
	}
	
}
