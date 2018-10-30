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
		User user = new User();
		user.setEmail(String.format("-"));
		user.setName(String.format("-"));
		user.setPassword(("-"));
		user.setSurname(String.format("-"));
		user.setUsername(String.format("anonim"));
		userRepository.save(user); 
    	int usersNumber = 12;
    	
    	for (int i = 2; i < usersNumber; i++) {
    		user = new User();
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