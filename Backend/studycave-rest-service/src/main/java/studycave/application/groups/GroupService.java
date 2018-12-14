
package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.text.RandomStringGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import studycave.application.files.MaterialRepository;
import studycave.application.groups.dto.AddMaterialDto;
import studycave.application.flashcard.Flashcard;
import studycave.application.flashcard.SetRepository;
import studycave.application.groups.dto.AddSetDto;
import studycave.application.groups.dto.AddTestDto;
import studycave.application.groups.members.SimpleStudyGroupMemberDTO;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.groups.members.StudyGroupMemberRepository;
import studycave.application.test.AnswerChoices;
import studycave.application.test.AnswerGaps;
import studycave.application.test.AnswerPairs;
import studycave.application.test.AnswerPuzzle;
import studycave.application.test.Question;
import studycave.application.test.QuestionChoices;
import studycave.application.test.QuestionGaps;
import studycave.application.test.QuestionPairs;
import studycave.application.test.QuestionPuzzle;
import studycave.application.test.TestRepository;
import studycave.application.user.SimpleUserInfo;
import studycave.application.user.User;
import studycave.application.user.UserRepository;
import studycave.application.files.Material;
import studycave.application.flashcard.Set;
import studycave.application.test.Test;
import studycave.application.user.SimpleUserInfo;

@Service
public class GroupService {

	@Autowired
	ModelMapper modelMapper;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	MaterialRepository materialRepository;
	@Autowired
	StudyGroupMemberRepository memberRepository;
	@Autowired
	SetRepository setRepository;
  	@Autowired
	TestRepository testRepository;
  	@PersistenceContext
	private EntityManager entityManager;

	public ResponseEntity<?> createGroup(CreateGroupDto groupDto) {
		StudyGroup group = modelMapper.map(groupDto, StudyGroup.class);
		RandomStringGenerator generator = new RandomStringGenerator.Builder().withinRange('0', 'z')
				.filteredBy(Character::isLetterOrDigit).build();

		String groupKey = generator.generate(10);

		while (!this.groupRepository.findByGroupKey(groupKey).isEmpty()) {
			groupKey = generator.generate(10);
		}
		;
		group.setGroupKey(groupKey);
		Optional<User> owner = this.userRepository.findByUsername(groupDto.getOwner());
		if (!owner.isPresent()) {
			return new ResponseEntity<>("Invalid Owner", HttpStatus.BAD_REQUEST);
		}

		List<StudyGroupMember> members = new ArrayList<>();
		StudyGroupMember member = new StudyGroupMember();
		member.setUser(owner.get());
		member.setIsGroupLeader(true);
		member.setGroup(group);
		members.add(member);
		group.setMembers(members);

		group = this.groupRepository.save(group);
		GroupDto createdGroupDto = modelMapper.map(group, GroupDto.class);
		createdGroupDto.setKey(group.getGroupKey());
		createdGroupDto.setOwner(group.getMembers().get(0).getUser().getUsername());
		return new ResponseEntity<GroupDto>(createdGroupDto, HttpStatus.OK);
	}

	public GroupInfoDto getGroupInfo(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		GroupInfoDto groupInfo = new GroupInfoDto();
		groupInfo.setId(group.getId());
		groupInfo.setName(group.getName());
		groupInfo.setDescription(group.getDescription());
		groupInfo.setGroupKey(group.getGroupKey());
		List<SimpleUserInfo> users = new ArrayList<>();
		for (StudyGroupMember m : group.getMembers()) {
			if (m.getIsGroupLeader() != true) {
				SimpleUserInfo u = new SimpleUserInfo();
				u.setId(m.getUser().getId());
				u.setUsername(m.getUser().getUsername());
				users.add(u);
			}
			else
			groupInfo.setOwner(m.getUser().getUsername());
		}
		groupInfo.setUsers(users);
		return groupInfo;
	}

	public ResponseEntity deleteUserFromGroup(Long gId, Long pId) {
		StudyGroupMember user = new StudyGroupMember();
		user = this.memberRepository.findUserInGroup(gId, pId);
		this.memberRepository.delete(user);
		return new ResponseEntity(HttpStatus.OK);

	}

	public ResponseEntity deleteGroup(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		for (StudyGroupMember m : group.getMembers()) {
			this.memberRepository.delete(m);
		}
		this.groupRepository.delete(group);
		return new ResponseEntity(HttpStatus.OK);
	}

	public ResponseEntity<?> generateCode(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		RandomStringGenerator generator = new RandomStringGenerator.Builder().withinRange('0', 'z')
				.filteredBy(Character::isLetterOrDigit).build();

		String groupKey = generator.generate(10);

		while (!this.groupRepository.findByGroupKey(groupKey).isEmpty()) {
			groupKey = generator.generate(10);
		}
		;
		this.groupRepository.save(group);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	public List<SimpleStudyGroupMemberDTO> getMyGroups(Long id) {
		// User user = new User();
		// user = this.userRepository.findByUsername(username).orElse(null);
		List<StudyGroupMember> groups = new ArrayList<>();
		groups = this.memberRepository.findByMember(id);
		List<SimpleStudyGroupMemberDTO> simplegroups = new ArrayList<>();
		for (StudyGroupMember g : groups) {
			SimpleStudyGroupMemberDTO s = new SimpleStudyGroupMemberDTO();
			s.setName(g.getGroup().getName());
			s.setId(g.getGroup().getId());
			if (g.getIsGroupLeader() == true)
				s.setRole("OWNER");
			else
				s.setRole("MEMBER");
			simplegroups.add(s);
		}
		return simplegroups;
	}

	public ResponseEntity<?> joinToGroup(Long userId, String groupCode) {
		List<StudyGroup> groups = this.groupRepository.findByGroupKey(groupCode);

		if (groups.isEmpty()) {
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}

		for (StudyGroup group : groups) {
			if (group.getGroupKey().equals(groupCode)) {
				for (StudyGroupMember member : group.getMembers()) {
					if (member.getUser().getId() == userId) {
						return new ResponseEntity<>("Użytkownik znajduje się już w grupie", HttpStatus.CONFLICT);
					}
				}
				StudyGroupMember newMember = new StudyGroupMember();
				newMember.setIsGroupLeader(false);
				newMember.setGroup(group);
				newMember.setUser(this.userRepository.findById(userId).orElse(null));
				this.memberRepository.save(newMember);
				GroupDto groupDto = modelMapper.map(group, GroupDto.class);
				return new ResponseEntity<GroupDto>(groupDto, HttpStatus.OK);
			}
		}

		return new ResponseEntity<>("Niepoprawny kod", HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<?> addFlashcardSets(String groupId, @RequestBody List<AddSetDto> setIds) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);;
		if (group == null) 	{
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		for (AddSetDto s : setIds) {
				Long setId = Long.parseLong(s.getSetId());
				this.setRepository.findById(setId).ifPresent(set -> {
					List<Flashcard> flashcards = set.getFlashcards();
					for (Flashcard flashcard : flashcards) {
						entityManager.detach(flashcard);
						flashcard.setId(null);
					}
					entityManager.detach(set);
					set.setId(null);
					set.setPermission("GROUP");
					set.setStatus("UNVERIFIED");
					set.setGroup(group);
					this.setRepository.save(set);
				});
			}

		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}
	

	public ResponseEntity<?> addMaterials(String groupId, @RequestBody List<AddMaterialDto> materialIds) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);;
		if (group == null) 	{
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
  		for (AddMaterialDto m : materialIds) {
				Long materialId = Long.parseLong(m.getMaterialId());
				this.materialRepository.findById(materialId).ifPresent(material -> {
					entityManager.detach(material);
					material.setId(null);
					material.setPermission("GROUP");
					material.setStatus("UNVERIFIED");
					material.setGroup(group);
					this.materialRepository.save(material);
				});
		}
		return new ResponseEntity<>("Dodano", HttpStatus.OK);
  }
  
	public ResponseEntity<?> addTests(String groupId, @RequestBody List<AddTestDto> testIds) {
		StudyGroup group = this.groupRepository.findById(Long.parseLong(groupId)).orElse(null);;
		if (group == null) 	{
			return new ResponseEntity<>("Nie znaleziono grupy", HttpStatus.NOT_FOUND);
		}
		for (AddTestDto t : testIds) {
				Long testId = Long.parseLong(t.getTestId());
				this.testRepository.findById(testId).ifPresent(test -> {
					List<Question> questions = test.getQuestions();
					for (Question question : questions) {
						if (question instanceof QuestionChoices) {
							for (AnswerChoices answer : ((QuestionChoices) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						if (question instanceof QuestionPairs) {
							for (AnswerPairs answer : ((QuestionPairs) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						if (question instanceof QuestionPuzzle) {
							for (AnswerPuzzle answer : ((QuestionPuzzle) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						if (question instanceof QuestionGaps) {
							for (AnswerGaps answer : ((QuestionGaps) question).getAnswers()) {
								entityManager.detach(answer);
								answer.setId(null);
							}
						}
						entityManager.detach(question);
						question.setId(null);
					}
					entityManager.detach(test);
					test.setId(null);
					test.setPermission("GROUP");
					test.setStatus("UNVERIFIED");
					test.setGroup(group);
					this.testRepository.save(test);
				});
			}

		return new ResponseEntity<>("Dodano", HttpStatus.OK);
	}
  
  public ResponseEntity<?> getContent(Long group_id, String type) {
		List<ContentDto> contents = new ArrayList<>();
		ContentDto content = new ContentDto();
		switch (type){
			case "tests":
				List<Test> tests = new ArrayList<>();
				tests = this.groupRepository.findTestByGroupKey(group_id);
				for (Test t : tests) {
					content.setId(t.getId());
					content.setOwner((userRepository.findById(t.getIdOwner()).orElse(null)).getUsername());
					content.setAddDate();
					content.setGrade((long) 0);
					content.setTitle(t.getTitle());	
					contents.add(content);
				}
				if(contents.isEmpty())
					return new ResponseEntity<>("Pusta lista testów", HttpStatus.OK);
				else
					return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
			case "materials":
				List<Material> materials = new ArrayList<>();
				materials = this.groupRepository.findMaterialByGroupKey(group_id);
				for (Material m : materials ) {
					content.setId(m.getId());
					content.setOwner((userRepository.findById((long)m.getOwner()).orElse(null)).getUsername());
					content.setAddDate();
					content.setGrade((long) 0);
					content.setTitle(m.getTitle());
					contents.add(content);
				}
				if(contents.isEmpty())
					return new ResponseEntity<>("Pusta lista materiałów", HttpStatus.OK);
				else
					return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
			case "flashcardsets":
				List<Set> sets = new ArrayList<>();
				sets = this.groupRepository.findSetByGroupKey(group_id);
				for (Set s : sets) {
					content.setId(s.getId());
					content.setOwner((userRepository.findById((long)s.getIdOwner()).orElse(null)).getUsername());
					content.setAddDate();
					content.setGrade((long) 0);
					content.setTitle(s.getName());
					contents.add(content);
				}
				if(contents.isEmpty())
					return new ResponseEntity<>("Pusta lista fiszek", HttpStatus.OK);
				else
					return new ResponseEntity<List<ContentDto>>(contents, HttpStatus.OK);
			default:
				return new ResponseEntity<>("Błąd w zapytaniu", HttpStatus.BAD_REQUEST);
		}
		
	}

}
