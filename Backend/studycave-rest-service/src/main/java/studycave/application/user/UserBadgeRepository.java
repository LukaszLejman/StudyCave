package studycave.application.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

	@Query("select ub from UserBadge ub where (ub.badge.id = :b and ub.user.id = :u )")
	List<UserBadge> findByIdAndUser(@Param("b") Long b, @Param("u") Long u);
}
