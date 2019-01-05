package studycave.application.userActivity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import studycave.application.files.Material;
import studycave.application.flashcard.Set;
import studycave.application.groups.GroupRepository;
import studycave.application.groups.StudyGroup;
import studycave.application.test.Test;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@Service
public class UserActivityService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserActivityRepository userActivityRepository;
	
	public ResponseEntity<?> saveActivity(
			String type,
			int points,
			String comment,
			User toUser,
			User fromUser,
			StudyGroup group,
			Material material,
			Set set,
			Test test
			) {
		UserActivity activity = new UserActivity();
		activity.setType(type);
		activity.setPoints(points);
		activity.setComment(comment);
		activity.setDate();
		activity.setToUser(toUser);
		activity.setFromUser(fromUser);
		activity.setGroup(group);
		activity.setTest(test);
		activity.setSet(set);
		activity.setMaterial(material);
		this.userActivityRepository.save(activity);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
