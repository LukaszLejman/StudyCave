package studycave.application.userActivity;
import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import studycave.application.files.Material;
import studycave.application.flashcard.Set;
import studycave.application.groups.StudyGroup;
import studycave.application.test.Test;
import studycave.application.user.User;

@Entity
public class UserActivity {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String type;
	
	private int points;
	
	private String comment;
	
	private Timestamp date;
	
    @ManyToOne
    @JoinColumn(name="group_id",referencedColumnName="id")
    private StudyGroup group;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "material_id")
    private Material material;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "set_id")
    private Set set;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "test_id")
    private Test test;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "toUser_id")
    private User toUser;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fromUser_id")
    private User fromUser;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate() {
		this.date = new java.sql.Timestamp(new java.util.Date().getTime());
	}

	public StudyGroup getGroup() {
		return group;
	}

	public void setGroup(StudyGroup group) {
		this.group = group;
	}

	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}

	public Set getSet() {
		return set;
	}

	public void setSet(Set set) {
		this.set = set;
	}

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
	}

	public User getToUser() {
		return toUser;
	}

	public void setToUser(User toUser) {
		this.toUser = toUser;
	}

	public User getFromUser() {
		return fromUser;
	}

	public void setFromUser(User fromUser) {
		this.fromUser = fromUser;
	}
}
