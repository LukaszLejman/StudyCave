package studycave.application.test;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TestRepository extends JpaRepository<Test, Long> {

	@Query("select t from Test t where (t.permission = 'GROUP' and t.group.id = :g and t.status = 'UNVERIFIED' )")
	List<Test> findWaitingTestByGroupKey(@Param("g") Long g);
}
