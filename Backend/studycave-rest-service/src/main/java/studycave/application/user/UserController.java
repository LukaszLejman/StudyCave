package studycave.application.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@Api
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping("/user/register")
	public void Register(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}
	
	@GetMapping("/user/{id}")
	public Optional<User> getInfo(
			@RequestHeader(value="Authorization") String headerStr,
			@PathVariable(required = true)Long id) {
		return userRepository.findById(id);
	}
	
	@PutMapping("/user/info/update")
	public void updateUser(@RequestBody User user) {
		if(user.getPassword() == null)
			user.setPassword(userRepository.findById(user.getId()).orElse(null).getPassword());
		else
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}
	
    @ApiOperation("Login.")
    @PostMapping("/login")
    public void fakeLogin( //show in Swagger 
    		@RequestBody UserLoginDTO user){
        throw new IllegalStateException("This method shouldn't be called. It's implemented by Spring Security filters.");
    }
	
}
