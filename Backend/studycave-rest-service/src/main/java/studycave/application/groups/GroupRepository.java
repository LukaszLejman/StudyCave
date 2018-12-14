package studycave.application.groups;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studycave.application.files.Material;
import studycave.application.flashcard.Set;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.test.Test;

public interface GroupRepository extends JpaRepository<StudyGroup, Long> {

	List<StudyGroup> findByName(String name);

	List<StudyGroup> findByGroupKey(String groupKey);
	
}