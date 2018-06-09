package studycave.application.flashcard;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "flashcardset") 
public class SimpleSet {
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
    private String permission;
    
    protected SimpleSet() {}

	public SimpleSet(String name, String category, int idOwner) {
		super();
		this.name = name;
		this.category = category;
		this.idOwner = idOwner;
	}
	
	public SimpleSet(Set set) {
		super();
		this.name = set.getName();
		this.category = set.getCategory();
		this.idOwner = set.getIdOwner();
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

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}
	
}
