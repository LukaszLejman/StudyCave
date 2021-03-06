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

import studycave.application.files.Material;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.test.Test;
import studycave.application.userActivity.UserActivity;

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

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "group", cascade = CascadeType.ALL)
	List<Material> materials = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "group", cascade = CascadeType.ALL)
	List<Test> tests = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "group", cascade = CascadeType.ALL)
	private List<UserActivity> activity;

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

	public List<Material> getMaterials() {
		return materials;
	}

	public void setMaterials(List<Material> materials) {
		this.materials = materials;
	}

	public List<Test> getTests() {
		return tests;
	}

	public void setTests(List<Test> tests) {
		this.tests = tests;
	}

	public List<UserActivity> getActivity() {
		return activity;
	}

	public void setActivity(List<UserActivity> activity) {
		this.activity = activity;
	}
}
