package studycave.application.test;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DiscriminatorFormula;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorFormula("case when type in ('true-false', 'single-choice', 'multiple-choice') then 1 when 'pairs' then 2 when 'puzzle' then 3 when 'gaps' then 4 else 5 end")
public abstract class Question {
    
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("question")
    private String text;
    @Column(name="nr_question")
    @JsonProperty("nr")
    private int nrQuestion;
    @NotNull
    private String type;
    private int points;

	@ApiModelProperty(hidden = true)
    @ManyToOne
    @JoinColumn(name="id_test",referencedColumnName="id")
    @JsonBackReference
    private Test test;

	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<Answer> answers = new ArrayList<>();

	public Question() {
		super();
	}
	

	public int getNrQuestion() {
		return nrQuestion;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	
    public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

/*
	public List<Answer> getAnswers() {
		return answers;
	}


	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
*/	
	
}
