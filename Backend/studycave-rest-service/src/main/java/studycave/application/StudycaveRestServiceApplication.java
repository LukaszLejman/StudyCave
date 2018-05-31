package studycave.application;

import javax.annotation.Resource;

import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import studycave.application.files.StorageService;


@SpringBootApplication
public class StudycaveRestServiceApplication implements CommandLineRunner {
	
	 
	@Resource
	StorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(StudycaveRestServiceApplication.class, args);
	}
	
	@Bean
	 public BCryptPasswordEncoder bCryptPasswordEncoder() {
	  return new BCryptPasswordEncoder();
	 }
	
	@Bean
	public ModelMapper modelMapper() {
	    return new ModelMapper();
	}
	
	@Override
	public void run(String... arg) throws Exception {
		storageService.deleteAll();
		storageService.init();
		try {
		storageService.initsave();
		}catch(Exception e) {
			//"save-dir" istnieje
		}
	}
	
}
