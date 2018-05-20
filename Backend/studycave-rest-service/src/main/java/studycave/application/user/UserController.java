package studycave.application.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@CrossOrigin
@RequestMapping("/user")
@Api
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/register")
	public void Register(@RequestBody User user) {
		userRepository.save(user);
	}
	
	@GetMapping("/info/{id}")
	public Optional<User> getInfo(@PathVariable(required = true)Long id) {
		return userRepository.findById(id);
	}
	
	@PutMapping("/info/update")
	public void updateUser(@RequestBody User user) {
		userRepository.save(user);
	}
	
}
