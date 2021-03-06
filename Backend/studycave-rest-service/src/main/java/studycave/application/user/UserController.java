package studycave.application.user;

import java.util.ArrayList;
import java.util.List;
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
import studycave.application.badges.Badge;
import studycave.application.badges.BadgeRepository;
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
	BadgeRepository badgeRepository;
	@Autowired
	UserBadgeRepository userBadgeRepository;
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
		
	// Badge for registering
		UserBadge badgeAchieved = new UserBadge();
		Badge badge = new Badge();
		badge = badgeRepository.findById((long)1).orElse(null);
		badgeAchieved.setBadge(badge);
		badgeAchieved.setUser(user);
		userBadgeRepository.save(badgeAchieved);

		
		return "Dodano uzytkownika";
	}
	
	@GetMapping("/user/{username}")
	public ResponseEntity<?> getInfo(
			@PathVariable(required = true)String username) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		User user =  userRepository.findByUsername(username).get();
		UserDTO userInfo = new UserDTO();
		userInfo.setId(user.getId());
		userInfo.setName(user.getName());
		userInfo.setSurname(user.getSurname());
		userInfo.setEmail(user.getEmail());
		userInfo.setPassword(user.getPassword());
		userInfo.setUsername(user.getUsername());
		if (currentPrincipalName.equals(username)) return new ResponseEntity<UserDTO>(userInfo,HttpStatus.OK);
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
		Long user_id = (userRepository.findByUsername(currentPrincipalName).orElse(null)).getId();
		List<UserBadgeDTO> userBadges = new ArrayList<>();
		List<Badge> badges = new ArrayList<>();
		badges = badgeRepository.findAll();
		for(Badge b : badges) {
			UserBadgeDTO badge = new UserBadgeDTO();
			badge.setBadgeName(b.getName());
			badge.setIcon(b.getIconPath());
			if(userBadgeRepository.findByIdAndUser(b.getId(), user_id).isEmpty())
				badge.setUnlocked(false);
			else
				badge.setUnlocked(true);
			userBadges.add(badge);
		}
		return new ResponseEntity<List<UserBadgeDTO>>(userBadges, HttpStatus.OK);
	}

}

