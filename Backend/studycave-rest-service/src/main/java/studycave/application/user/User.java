package studycave.application.user;

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
import studycave.application.userActivity.UserActivity;


@Entity
public class User {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String surname;

	@Column(name="login",unique=true)
	private String username;
	
	private String password;
	
	@Column(unique=true)
	private String email;

    @OneToMany(fetch = FetchType.LAZY,mappedBy="user",cascade = CascadeType.ALL)
    List<StudyGroupMember> groupMembers = new ArrayList<>();
    
	@OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
	private List<UserActivity> activityTo;
	
	@OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
	private List<UserActivity> activityFrom;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	List<UserBadge> badges = new ArrayList<>();
	
	
	public User(){
		super();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<UserActivity> getActivityTo() {
		return activityTo;
	}

	public void setActivityTo(List<UserActivity> activityTo) {
		this.activityTo = activityTo;
	}

	public List<UserActivity> getActivityFrom() {
		return activityFrom;
	}

	public void setActivityFrom(List<UserActivity> activityFrom) {
		this.activityFrom = activityFrom;
	}

	
}
