package studycave.application;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@CrossOrigin
@Api
public class HelloController {

	@GetMapping("/hello")
	public String getHello() {
		return "Działam wyśmienicie!";
	}
}
