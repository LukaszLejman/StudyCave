package studycave.application.groups;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<StudyGroup, Long> {

	List<StudyGroup> findByName(String name);
}