package studycave.application.userActivity;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {

    @Query("SELECT u FROM UserActivity u WHERE (u.fromUser.id = ?1 OR u.toUser.id = ?1) "
    		+ "AND (?2 is null OR u.group.id = ?2) AND (?3 is null OR u.date >= ?3) AND (?4 is null OR u.date <= ?4)")
    List<UserActivity> findAllByToUserOrFromUserAndGroupAndTime(Long userId, Long groupId,
    		Date start, Timestamp end);

}
