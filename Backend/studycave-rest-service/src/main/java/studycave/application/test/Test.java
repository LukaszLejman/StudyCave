package studycave.application.test;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Test {
    
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(name="id_owner")
    @JsonProperty("owner")
    private Long idOwner;
    @Column(name="add_date")
    @JsonProperty("add_date")
    private Date addDate;
    @Column(name="edit_date")
    @JsonProperty("edit_date")
    private Date editDate;
    
    private String permission;
    
    private int grade;

    @OneToMany(fetch = FetchType.LAZY,mappedBy="test",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Question> questions = new ArrayList<>();

	public Test() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getIdOwner() {
		return idOwner;
	}

	public void setIdOwner(Long idOwner) {
		this.idOwner = idOwner;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.addDate = sqlDate;
	}

	public void setEditDate() {
		java.util.Date utilDate = new java.util.Date();
		Date sqlDate = new Date(utilDate.getTime());
		this.editDate = sqlDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}
    
    public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public int getGrade() {
		return grade;
	}
	
	public void setGrade() {
		this.grade = 0;
	}
	
	public void setGrade(int grade) {
		this.grade = grade;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
    
    
}
