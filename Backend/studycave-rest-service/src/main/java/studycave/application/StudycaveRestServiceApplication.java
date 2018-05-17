package studycave.application;

import javax.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class StudycaveRestServiceApplication implements CommandLineRunner {
	
	 
	@Resource
	StorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(StudycaveRestServiceApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
		storageService.deleteAll();
		storageService.init();
	}
	
}
