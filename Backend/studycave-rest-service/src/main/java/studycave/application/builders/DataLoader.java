package studycave.application.builders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {


    private UsersBuilder usersBuilder;

    @Autowired
    public DataLoader(UsersBuilder usersBuilder) {
        this.usersBuilder = usersBuilder;
    }

    public void run(ApplicationArguments args) {
    	// if (DROP_DATABASE) {
    	this.usersBuilder.build();
    	System.out.println("All builders completed");
    }
}