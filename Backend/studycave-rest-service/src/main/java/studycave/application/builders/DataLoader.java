package studycave.application.builders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {


    private UsersBuilder usersBuilder;
    private FlashcardsBuilder flashcardsBuilder;
    private TestsBuilder testsBuilder;
    private BadgesBuilder badgesBuilder;


    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String databaseMode;
    
    @Autowired
    public DataLoader(UsersBuilder usersBuilder, FlashcardsBuilder flashcardsBuilder, TestsBuilder testsBuilder,  BadgesBuilder badgesBuilder) {
        this.usersBuilder = usersBuilder;
        this.flashcardsBuilder = flashcardsBuilder;
        this.testsBuilder = testsBuilder;
        this.badgesBuilder = badgesBuilder;
    }


    public void run(ApplicationArguments args) {
    	 if (this.databaseMode.contains("create")) {
    		 this.usersBuilder.build();
    		 this.flashcardsBuilder.build();
    		 this.testsBuilder.build();
    		 this.badgesBuilder.build();
    		 System.out.println("All builders completed");
    	 }
    }
}