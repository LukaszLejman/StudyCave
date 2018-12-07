package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import studycave.application.groups.members.StudyGroupMember;

@Entity
public class StudyGroup {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String description;

	@Column(unique = true)
	private String groupKey;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "group", cascade = CascadeType.ALL)
	List<StudyGroupMember> members = new ArrayList<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "group", cascade = CascadeType.ALL)
	List<StudyGroupMember> flashcardSets = new ArrayList<>();

	
	public StudyGroup() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<StudyGroupMember> getMembers() {
		return members;
	}

	public void setMembers(List<StudyGroupMember> members) {
		this.members = members;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getGroupKey() {
		return groupKey;
	}

	public void setGroupKey(String groupKey) {
		this.groupKey = groupKey;
	}

	public List<StudyGroupMember> getFlashcardSets() {
		return flashcardSets;
	}

	public void setFlashcardSets(List<StudyGroupMember> flashcardSets) {
		this.flashcardSets = flashcardSets;
	}
	
	
}
