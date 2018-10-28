package studycave.application.builders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import studycave.application.user.User;
import studycave.application.user.UserRepository;

@Component
public class UsersBuilder {

	@Autowired 
	BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserRepository userRepository;
    
    
    @Autowired
    public UsersBuilder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void build() {
    	int usersNumber = 10;
    	
    	for (int i = 0; i < usersNumber; i++) {
    		User user = new User();
    		user.setEmail(String.format("u%d@email.com", i));
    		user.setName(String.format("Name%d", i));
    		user.setPassword(bCryptPasswordEncoder.encode("123qwe"));
    		user.setSurname(String.format("Surname%d", i));
    		user.setUsername(String.format("u%d", i));
    		userRepository.save(user);    		
    	}
        System.out.println("Users inserted");
    }
}