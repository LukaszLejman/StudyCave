package studycave.application.test;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;






@Entity
public class Question {
    
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String text;
    @Column(name="nr_question")
    @JsonProperty("nr_question")
    private int nrQuestion;
    
    @ManyToOne
    @JoinColumn(name="id_test",referencedColumnName="id")
    @JsonBackReference
    private Test test;
    
    @OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Answer> answers;

	public Question() {
		super();
	}

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

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int isNrQuestion() {
		return nrQuestion;
	}

	public void setNrQuestion(int nrQuestion) {
		this.nrQuestion = nrQuestion;
	}

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
	}

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
    
    
    
    
}
