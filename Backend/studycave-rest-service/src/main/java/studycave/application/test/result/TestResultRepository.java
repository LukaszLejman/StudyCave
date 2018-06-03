package studycave.application.test.result;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TestResultRepository extends JpaRepository<TestResult,Long> {

	List<TestResult> findByIdOwner(Long id);

	List<TestResult> findByIdOwnerAndIdTest(Long id, Long id2);

//	@Query("SELECT t FROM TestResult t WHERE t.userScore IN (SELECT MAX(userScore) FROM TestResult)")
//	public TestResult findMaxByUserScore();
}
