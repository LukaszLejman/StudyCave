package studycave.application.builders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {


    private UsersBuilder usersBuilder;

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String databaseMode;
    
    @Autowired
    public DataLoader(UsersBuilder usersBuilder) {
        this.usersBuilder = usersBuilder;
    }

    public void run(ApplicationArguments args) {
    	 if (this.databaseMode.contains("create")) {
    		 this.usersBuilder.build();
    		 System.out.println("All builders completed");
    	 }
    }
}