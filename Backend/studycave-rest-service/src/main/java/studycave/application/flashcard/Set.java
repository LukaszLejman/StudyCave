package studycave.application.flashcard;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import studycave.application.groups.StudyGroup;
import studycave.application.userActivity.UserActivity;


@Entity
@Table(name = "flashcardset") 
public class Set {
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    @Column(name="id_owner")
	@JsonProperty("owner")
    private int idOwner;
    @Column(name="add_date")
	@JsonProperty("add_date")
    private Date addDate;
    @Column(name="edit_date")
	@JsonProperty("edit_date")
    private Date editDate;
    private int grade;
    @Column(name="permission")
    private String permission;
    @Column(name="status")
    private String status;
    
    @OneToMany(fetch = FetchType.LAZY,mappedBy="flashcardSet",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Flashcard> flashcards;
    
    @ManyToOne
    @JoinColumn(name="group_id",referencedColumnName="id")
    private StudyGroup group;
   
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "set", cascade = CascadeType.ALL)
	private List<UserActivity> activity;
	
    protected Set() {}

	public Set(String name, String category, int idOwner) {
		super();
		this.name = name;
		this.category = category;
		this.idOwner = idOwner;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getIdOwner() {
		return idOwner;
	}

	public void setIdOwner(int idOwner) {
		this.idOwner = idOwner;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}
	
	public void setAddDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.addDate = sqlDate;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}
	
	public void setEditDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.editDate = sqlDate;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public List<Flashcard> getFlashcards() {
		return flashcards;
	}

	public void setFlashcards(List<Flashcard> flashcards) {
		this.flashcards = flashcards;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public StudyGroup getGroup() {
		return group;
	}

	public void setGroup(StudyGroup group) {
		this.group = group;
	}

	public List<UserActivity> getActivity() {
		return activity;
	}

	public void setActivity(List<UserActivity> activity) {
		this.activity = activity;
	}
}
