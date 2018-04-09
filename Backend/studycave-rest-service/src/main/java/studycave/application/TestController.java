package studycave.application;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/test")
@Api
public class TestController {
	@GetMapping("/hello")
	@ApiOperation(value = "Returns Hello World")
	public String test() {
		return "Hello World!";
	}
	
	@PostMapping("/hello")
	@ApiOperation(value = "Returns Hello")
	public String test2(@RequestBody String name) {
		return String.format("Hello %s!", name);
	}
}
