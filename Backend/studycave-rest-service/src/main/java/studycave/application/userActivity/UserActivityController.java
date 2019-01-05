package studycave.application.userActivity;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import studycave.application.groups.GroupRepository;
import studycave.application.groups.StudyGroup;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@RestController
@CrossOrigin
@Api
@PreAuthorize("isAuthenticated()")
public class UserActivityController {

	@Autowired
	UserRepository userRepository;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserActivityRepository userActivityRepository;

	@GetMapping("/groups/{groupId}/users/activity")
	public ResponseEntity<?> getUserActivity(@PathVariable(required = true) Long groupId,
			@RequestParam(value = "startDate", required = false) Date startDate,
			@RequestParam(value = "endDate", required = false) Date endDate,
			@RequestParam(value = "sort", required = false) SortType sort) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		User user = userRepository.findByUsername(currentPrincipalName).get();

		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(endDate.getTime());
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		c.set(Calendar.MILLISECOND, 0);
		Timestamp endDateTime = new Timestamp(c.getTimeInMillis());
		List<UserActivity> userActivity = this.userActivityRepository
				.findAllByToUserOrFromUserAndGroupAndTime(user.getId(), groupId, startDate, endDateTime);
		List<UserActivityDTO> list = new ArrayList<UserActivityDTO>();

		Collections.sort(userActivity, new Comparator<UserActivity>() {
			public int compare(UserActivity o1, UserActivity o2) {
				return o1.getDate().compareTo(o2.getDate());
			}
		});

		for (UserActivity u : userActivity) {

			String resourceType = null;
			String resourceName = null;

			if (u.getMaterial() != null) {
				resourceType = "material";
				resourceName = u.getMaterial().getTitle();
			}

			if (u.getTest() != null) {
				resourceType = "test";
				resourceName = u.getTest().getTitle();
			}

			if (u.getSet() != null) {
				resourceType = "flashcards";
				resourceName = u.getSet().getName();
			}

			UserActivityDTO dto;
			dto = new UserActivityDTO(
					u.getId(),
					u.getType(),
					u.getPoints(),
					u.getComment(),
					new SimpleDateFormat("yyyy-MM-dd").format(u.getDate()),
					resourceType,
					resourceName,
					u.getFromUser() != null ? u.getFromUser().getUsername() : null,
					u.getToUser() != null ? u.getToUser().getUsername() : null
					);
			list.add(dto);
		}

		if (sort == SortType.DESC) {
			Collections.reverse(list);
		}

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

//	@GetMapping("/activityTest")
//	public ResponseEntity<?> Test() {
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		String currentPrincipalName = authentication.getName();
//		User user = userRepository.findByUsername(currentPrincipalName).get();
//		StudyGroup group = groupRepository.findById(Long.valueOf("1")).orElse(null);
//		UserActivity activity = new UserActivity();
//		activity.setComment("qqq");
//		activity.setType("acceptedResource");
//		activity.setDate();
//		activity.setToUser(user);
//		activity.setToUser(user);
//		activity.setGroup(group);
//		this.userActivityRepository.save(activity);
//		return null;
//	}
}
