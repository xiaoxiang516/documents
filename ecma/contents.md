```
Contents
Introduction
1 Scope
2 Conformance
3 Normative references
4 Overview
  4.1 Web Scripting
  4.2 ECMAScript Overview
  4.2.1 Objects
  4.2.2 The Strict Variant of ECMAScript
  4.3 Terms and definitions
  4.3.1 type
  4.3.2 primitive value
  4.3.3 object
  4.3.4 constructor
  4.3.5 prototype
  4.3.6 ordinary object
  4.3.7 exotic object
  4.3.8 standard object
  4.3.9 built-in object
  4.3.10 undefined value
  4.3.11 Undefined type
  4.3.12 null value
  4.3.13 Null type
  4.3.14 Boolean value
  4.3.15 Boolean type
  4.3.16 Boolean object
  4.3.17 String value
  4.3.18 String type
  4.3.19 String object
  4.3.20 Number value
  4.3.21 Number type
  4.3.22 Number object
  4.3.23 Infinity
  4.3.24 NaN
  4.3.25 Symbol value
  4.3.26 Symbol type
  4.3.27 Symbol object
  4.3.28 function
  4.3.29 built-in function
  4.3.30 property
  4.3.31 method
  4.3.32 built-in method
  4.3.33 attribute
  4.3.34 own property
  4.3.35 inherited property
  4.4 Organization of This Specification
5 Notational Conventions
  5.1 Syntactic and Lexical Grammars
  5.1.1 Context-Free Grammars
  5.1.2 The Lexical and RegExp Grammars
  5.1.3 The Numeric String Grammar
  5.1.4 The Syntactic Grammar
  5.1.5 Grammar Notation
5.2 Algorithm Conventions
5.3 Static Semantic Rules
6 ECMAScript Data Types and Values
6.1 ECMAScript Language Types
  6.1.1 The Undefined Type
  6.1.2 The Null Type
  6.1.3 The Boolean Type
  6.1.4 The String Type
  6.1.5 The Symbol Type
  6.1.6 The Number Type
  6.1.7 The Object Type
6.2 ECMAScript Specification Types
  6.2.1 The List and Record Specification Type
  6.2.2 The Completion Record Specification Type
  6.2.3 The Reference Specification Type
  6.2.4 The Property Descriptor Specification Type
  6.2.5 The Lexical Environment and Environment Record Specification Types
  6.2.6 Data Blocks
7 Abstract Operations
7.1 Type Conversion
7.1.1 ToPrimitive ( input [, PreferredType] )
7.1.2 ToBoolean ( argument )
7.1.3 ToNumber ( argument )
7.1.4 ToInteger ( argument )
7.1.5 ToInt32 ( argument )
7.1.6 ToUint32 ( argument )
7.1.7 ToInt16 ( argument )
7.1.8 ToUint16 ( argument )
7.1.9 ToInt8 ( argument )
7.1.10 ToUint8 ( argument )
7.1.11 ToUint8Clamp ( argument )
7.1.12 ToString ( argument )
7.1.13 ToObject ( argument )
7.1.14 ToPropertyKey ( argument )
7.1.15 ToLength ( argument )
7.1.16 CanonicalNumericIndexString ( argument )
7.2 Testing and Comparison Operations
7.2.1 RequireObjectCoercible ( argument )
7.2.2 IsArray ( argument )
7.2.3 IsCallable ( argument )
7.2.4 IsConstructor ( argument )
7.2.5 IsExtensible (O)
7.2.6 IsInteger ( argument )
7.2.7 IsPropertyKey ( argument )
7.2.8 IsRegExp ( argument )
7.2.9 SameValue(x, y)
7.2.10 SameValueZero(x, y)
7.2.11 Abstract Relational Comparison
7.2.12 Abstract Equality Comparison
7.2.13 Strict Equality Comparison
7.3 Operations on Objects
7.3.1 Get (O, P)
7.3.2 GetV (V, P)
7.3.3 Set (O, P, V, Throw)
7.3.4 CreateDataProperty (O, P, V)
7.3.5 CreateMethodProperty (O, P, V)
7.3.6 CreateDataPropertyOrThrow (O, P, V)
7.3.7 DefinePropertyOrThrow (O, P, desc)
7.3.8 DeletePropertyOrThrow (O, P)
7.3.9 GetMethod (O, P)
7.3.10 HasProperty (O, P)
7.3.11 HasOwnProperty (O, P)
7.3.12 Call(F, V, [argumentsList])
7.3.13 Construct (F, [argumentsList], [newTarget])
7.3.14 SetIntegrityLevel (O, level)
7.3.15 TestIntegrityLevel (O, level)
7.3.16 CreateArrayFromList (elements)
7.3.17 CreateListFromArrayLike (obj [, elementTypes] )
7.3.18 Invoke(O,P, [argumentsList])
7.3.19 OrdinaryHasInstance (C, O)
7.3.20 SpeciesConstructor ( O, defaultConstructor )
7.3.21 EnumerableOwnNames (O)
7.3.22 GetFunctionRealm ( obj )
7.4 Operations on Iterator Objects
7.4.1 GetIterator ( obj, method )
7.4.2 IteratorNext ( iterator, value )
7.4.3 IteratorComplete ( iterResult )
7.4.4 IteratorValue ( iterResult )
7.4.5 IteratorStep ( iterator )
7.4.6 IteratorClose( iterator, completion )
7.4.7 CreateIterResultObject ( value, done )
7.4.8 CreateListIterator ( list )
8 Executable Code and Execution Contexts
8.1 Lexical Environments
8.1.1 Environment Records
8.1.2 Lexical Environment Operations
8.2 Code Realms
8.2.1 CreateRealm ( )
8.2.2 CreateIntrinsics ( realmRec )
8.2.3 SetRealmGlobalObject ( realmRec, globalObj )
8.2.4 SetDefaultGlobalBindings ( realmRec )
8.3 Execution Contexts
8.3.1 ResolveBinding ( name, [env] )
8.3.2 GetThisEnvironment ( )
8.3.3 ResolveThisBinding ( )
8.3.4 GetNewTarget ( )
8.3.5 GetGlobalObject ( )
8.4 Jobs and Job Queues
8.4.1 EnqueueJob (queueName, job, arguments)
8.4.2 NextJob result
8.5 ECMAScript Initialization()
8.5.1 InitializeHostDefinedRealm ( realm )
9 Ordinary and Exotic Objects Behaviours
9.1 Ordinary Object Internal Methods and Internal Slots
9.1.1 [[GetPrototypeOf]] ( )
9.1.2 [[SetPrototypeOf]] (V)
9.1.3 [[IsExtensible]] ( )
9.1.4 [[PreventExtensions]] ( )
9.1.5 [[GetOwnProperty]] (P)
9.1.6 [[DefineOwnProperty]] (P, Desc)
9.1.7 [[HasProperty]](P)
9.1.8 [[Get]] (P, Receiver)
9.1.9 [[Set]] ( P, V, Receiver)
9.1.10 [[Delete]] (P)
9.1.11 [[Enumerate]] ()
9.1.12 [[OwnPropertyKeys]] ( )
9.1.13 ObjectCreate(proto, internalSlotsList)
9.1.14 OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto, internalSlotsList )
9.1.15 GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
9.2 ECMAScript Function Objects
9.2.1 [[Call]] ( thisArgument, argumentsList)
9.2.2 [[Construct]] ( argumentsList, newTarget)
9.2.3 FunctionAllocate (functionPrototype, strict [,functionKind] )
9.2.4 FunctionInitialize (F, kind, ParameterList, Body, Scope)
9.2.5 FunctionCreate (kind, ParameterList, Body, Scope, Strict, prototype)
9.2.6 GeneratorFunctionCreate (kind, ParameterList, Body, Scope, Strict)
9.2.7 AddRestrictedFunctionProperties ( F, realm )
9.2.8 MakeConstructor (F, writablePrototype, prototype)
9.2.9 MakeClassConstructor ( F)
9.2.10 MakeMethod ( F, homeObject)
9.2.11 SetFunctionName (F, name, prefix)
9.2.12 FunctionDeclarationInstantiation(func, argumentsList)
9.3 Built-in Function Objects
9.3.1 [[Call]] ( thisArgument, argumentsList)
9.3.2 [[Construct]] (argumentsList, newTarget)
9.3.3 CreateBuiltinFunction(realm, steps, prototype, internalSlotsList)
9.4 Built-in Exotic Object Internal Methods and Slots
9.4.1 Bound Function Exotic Objects
9.4.2 Array Exotic Objects
9.4.3 String Exotic Objects
9.4.4 Arguments Exotic Objects
9.4.5 Integer Indexed Exotic Objects
9.4.6 Module Namespace Exotic Objects
9.5 Proxy Object Internal Methods and Internal Slots
9.5.1 [[GetPrototypeOf]] ( )
9.5.2 [[SetPrototypeOf]] (V)
9.5.3 [[IsExtensible]] ( )
9.5.4 [[PreventExtensions]] ( )
9.5.5 [[GetOwnProperty]] (P)
9.5.6 [[DefineOwnProperty]] (P, Desc)
9.5.7 [[HasProperty]] (P)
9.5.8 [[Get]] (P, Receiver)
9.5.9 [[Set]] ( P, V, Receiver)
9.5.10 [[Delete]] (P)
9.5.11 [[Enumerate]] ()
9.5.12 [[OwnPropertyKeys]] ( )
9.5.13 [[Call]] (thisArgument, argumentsList)
9.5.14 [[Construct]] ( argumentsList, newTarget)
9.5.15 ProxyCreate(target, handler)
10 ECMAScript Language: Source Code
10.1 Source Text
10.1.1 Static Semantics: UTF16Encoding ( cp )
10.1.2 Static Semantics: UTF16Decode( lead, trail )
10.2 Types of Source Code
10.2.1 Strict Mode Code
10.2.2 Non-ECMAScript Functions
11 ECMAScript Language: Lexical Grammar
11.1 Unicode Format-Control Characters
11.2 White Space
11.3 Line Terminators
11.4 Comments
11.5 Tokens
11.6 Names and Keywords
11.6.1 Identifier Names
11.6.2 Reserved Words
11.7 Punctuators
11.8 Literals
11.8.1 Null Literals
11.8.2 Boolean Literals
11.8.3 Numeric Literals
11.8.4 String Literals
11.8.5 Regular Expression Literals
11.8.6 Template Literal Lexical Components
11.9 Automatic Semicolon Insertion
11.9.1 Rules of Automatic Semicolon Insertion
11.9.2 Examples of Automatic Semicolon Insertion
12 ECMAScript Language: Expressions
12.1 Identifiers
12.1.1 Static Semantics: Early Errors
12.1.2 Static Semantics: BoundNames
12.1.3 Static Semantics: IsValidSimpleAssignmentTarget
12.1.4 Static Semantics: StringValue
12.1.5 Runtime Semantics: BindingInitialization
12.1.6 Runtime Semantics: Evaluation
12.2 Primary Expression
12.2.1 Semantics
12.2.2 The this Keyword
12.2.3 Identifier Reference
12.2.4 Literals
12.2.5 Array Initializer
12.2.6 Object Initializer
12.2.7 Function Defining Expressions
12.2.8 Regular Expression Literals
12.2.9 Template Literals
12.2.10 The Grouping Operator
12.3 Left-Hand-Side Expressions
12.3.1 Static Semantics
12.3.2 Property Accessors
12.3.3 The new Operator
12.3.4 Function Calls
12.3.5 The super Keyword
12.3.6 Argument Lists
12.3.7 Tagged Templates
12.3.8 Meta Properties
12.4 Postfix Expressions
12.4.1 Static Semantics: Early Errors
12.4.2 Static Semantics: IsFunctionDefinition
12.4.3 Static Semantics: IsValidSimpleAssignmentTarget
12.4.4 Postfix Increment Operator
12.4.5 Postfix Decrement Operator
12.5 Unary Operators
12.5.1 Static Semantics: Early Errors
12.5.2 Static Semantics: IsFunctionDefinition
12.5.3 Static Semantics: IsValidSimpleAssignmentTarget
12.5.4 The delete Operator
12.5.5 The void Operator
12.5.6 The typeof Operator
12.5.7 Prefix Increment Operator
12.5.8 Prefix Decrement Operator
12.5.9 Unary + Operator
12.5.10 Unary - Operator
12.5.11 Bitwise NOT Operator ( ~ )
12.5.12 Logical NOT Operator ( ! )
12.6 Multiplicative Operators
12.6.1 Static Semantics: IsFunctionDefinition
12.6.2 Static Semantics: IsValidSimpleAssignmentTarget
12.6.3 Runtime Semantics: Evaluation
12.7 Additive Operators
12.7.1 Static Semantics: IsFunctionDefinition
12.7.2 Static Semantics: IsValidSimpleAssignmentTarget
12.7.3 The Addition operator ( + )
12.7.4 The Subtraction Operator ( - )
12.7.5 Applying the Additive Operators to Numbers
12.8 Bitwise Shift Operators
12.8.1 Static Semantics: IsFunctionDefinition
12.8.2 Static Semantics: IsValidSimpleAssignmentTarget
12.8.3 The Left Shift Operator ( << )
12.8.4 The Signed Right Shift Operator ( >> )
12.8.5 The Unsigned Right Shift Operator ( >>> )
12.9 Relational Operators
12.9.1 Static Semantics: IsFunctionDefinition
12.9.2 Static Semantics: IsValidSimpleAssignmentTarget
12.9.3 Runtime Semantics: Evaluation
12.9.4 Runtime Semantics: InstanceofOperator(O, C)
12.10 Equality Operators
12.10.1 Static Semantics: IsFunctionDefinition
12.10.2 Static Semantics: IsValidSimpleAssignmentTarget
12.10.3 Runtime Semantics: Evaluation
12.11 Binary Bitwise Operators
12.11.1 Static Semantics: IsFunctionDefinition
12.11.2 Static Semantics: IsValidSimpleAssignmentTarget
12.11.3 Runtime Semantics: Evaluation
12.12 Binary Logical Operators
12.12.1 Static Semantics: IsFunctionDefinition
12.12.2 Static Semantics: IsValidSimpleAssignmentTarget
12.12.3 Runtime Semantics: Evaluation
12.13 Conditional Operator ( ? : )
12.13.1 Static Semantics: IsFunctionDefinition
12.13.2 Static Semantics: IsValidSimpleAssignmentTarget
12.13.3 Runtime Semantics: Evaluation
12.14 Assignment Operators
12.14.1 Static Semantics: Early Errors
12.14.2 Static Semantics: IsFunctionDefinition
12.14.3 Static Semantics: IsValidSimpleAssignmentTarget
12.14.4 Runtime Semantics: Evaluation
12.14.5 Destructuring Assignment
12.15 Comma Operator ( , )
12.15.1 Static Semantics: IsFunctionDefinition
12.15.2 Static Semantics: IsValidSimpleAssignmentTarget
12.15.3 Runtime Semantics: Evaluation
13 ECMAScript Language: Statements and Declarations
13.1 Statement Semantics
13.1.1 Static Semantics: ContainsDuplicateLabels
13.1.2 Static Semantics: ContainsUndefinedBreakTarget
13.1.3 Static Semantics: ContainsUndefinedContinueTarget
13.1.4 Static Semantics: DeclarationPart
13.1.5 Static Semantics: VarDeclaredNames
13.1.6 Static Semantics: VarScopedDeclarations
13.1.7 Runtime Semantics: LabelledEvaluation
13.1.8 Runtime Semantics: Evaluation
13.2 Block
13.2.1 Static Semantics: Early Errors
13.2.2 Static Semantics: ContainsDuplicateLabels
13.2.3 Static Semantics: ContainsUndefinedBreakTarget
13.2.4 Static Semantics: ContainsUndefinedContinueTarget
13.2.5 Static Semantics: LexicallyDeclaredNames
13.2.6 Static Semantics: LexicallyScopedDeclarations
13.2.7 Static Semantics: TopLevelLexicallyDeclaredNames
13.2.8 Static Semantics: TopLevelLexicallyScopedDeclarations
13.2.9 Static Semantics: TopLevelVarDeclaredNames
13.2.10 Static Semantics: TopLevelVarScopedDeclarations
13.2.11 Static Semantics: VarDeclaredNames
13.2.12 Static Semantics: VarScopedDeclarations
13.2.13 Runtime Semantics: Evaluation
13.2.14 Runtime Semantics: BlockDeclarationInstantiation( code, env )
13.3 Declarations and the Variable Statement
13.3.1 Let and Const Declarations
13.3.2 Variable Statement
13.3.3 Destructuring Binding Patterns
13.4 Empty Statement
13.4.1 Runtime Semantics: Evaluation
13.5 Expression Statement
13.5.1 Runtime Semantics: Evaluation
13.6 The if Statement
13.6.1 Static Semantics: Early Errors
13.6.2 Static Semantics: ContainsDuplicateLabels
13.6.3 Static Semantics: ContainsUndefinedBreakTarget
13.6.4 Static Semantics: ContainsUndefinedContinueTarget
13.6.5 Static Semantics: VarDeclaredNames
13.6.6 Static Semantics: VarScopedDeclarations
13.6.7 Runtime Semantics: Evaluation
13.7 Iteration Statements
13.7.1 Semantics
13.7.2 The do-while Statement
13.7.3 The while Statement
13.7.4 The for Statement
13.7.5 The for-in and for-of Statements
13.8 The continue Statement
13.8.1 Static Semantics: Early Errors
13.8.2 Static Semantics: ContainsUndefinedContinueTarget
13.8.3 Runtime Semantics: Evaluation
13.9 The break Statement
13.9.1 Static Semantics: Early Errors
13.9.2 Static Semantics: ContainsUndefinedBreakTarget
13.9.3 Runtime Semantics: Evaluation
13.10 The return Statement
13.10.1 Runtime Semantics: Evaluation
13.11 The with Statement
13.11.1 Static Semantics: Early Errors
13.11.2 Static Semantics: ContainsDuplicateLabels
13.11.3 Static Semantics: ContainsUndefinedBreakTarget
13.11.4 Static Semantics: ContainsUndefinedContinueTarget
13.11.5 Static Semantics: VarDeclaredNames
13.11.6 Static Semantics: VarScopedDeclarations
13.11.7 Runtime Semantics: Evaluation
13.12 The switch Statement
13.12.1 Static Semantics: Early Errors
13.12.2 Static Semantics: ContainsDuplicateLabels
13.12.3 Static Semantics: ContainsUndefinedBreakTarget
13.12.4 Static Semantics: ContainsUndefinedContinueTarget
13.12.5 Static Semantics: LexicallyDeclaredNames
13.12.6 Static Semantics: LexicallyScopedDeclarations
13.12.7 Static Semantics: VarDeclaredNames
13.12.8 Static Semantics: VarScopedDeclarations
13.12.9 Runtime Semantics: CaseBlockEvaluation
13.12.10 Runtime Semantics: CaseSelectorEvaluation
13.12.11 Runtime Semantics: Evaluation
13.13 Labelled Statements
13.13.1 Static Semantics: Early Errors
13.13.2 Static Semantics: ContainsDuplicateLabels
13.13.3 Static Semantics: ContainsUndefinedBreakTarget
13.13.4 Static Semantics: ContainsUndefinedContinueTarget
13.13.5 Static Semantics: IsLabelledFunction ( stmt )
13.13.6 Static Semantics: LexicallyDeclaredNames
13.13.7 Static Semantics: LexicallyScopedDeclarations
13.13.8 Static Semantics: TopLevelLexicallyDeclaredNames
13.13.9 Static Semantics: TopLevelLexicallyScopedDeclarations
13.13.10 Static Semantics: TopLevelVarDeclaredNames
13.13.11 Static Semantics: TopLevelVarScopedDeclarations
13.13.12 Static Semantics: VarDeclaredNames
13.13.13 Static Semantics: VarScopedDeclarations
13.13.14 Runtime Semantics: LabelledEvaluation
13.13.15 Runtime Semantics: Evaluation
13.14 The throw Statement
13.14.1 Runtime Semantics: Evaluation
13.15 The try Statement
13.15.1 Static Semantics: Early Errors
13.15.2 Static Semantics: ContainsDuplicateLabels
13.15.3 Static Semantics: ContainsUndefinedBreakTarget
13.15.4 Static Semantics: ContainsUndefinedContinueTarget
13.15.5 Static Semantics: VarDeclaredNames
13.15.6 Static Semantics: VarScopedDeclarations
13.15.7 Runtime Semantics: CatchClauseEvaluation
13.15.8 Runtime Semantics: Evaluation
13.16 The debugger statement
13.16.1 Runtime Semantics: Evaluation
14 ECMAScript Language: Functions and Classes
14.1 Function Definitions
14.1.1 Directive Prologues and the Use Strict Directive
14.1.2 Static Semantics: Early Errors
14.1.3 Static Semantics: BoundNames
14.1.4 Static Semantics: Contains
14.1.5 Static Semantics: ContainsExpression
14.1.6 Static Semantics: ExpectedArgumentCount
14.1.7 Static Semantics: HasInitializer
14.1.8 Static Semantics: HasName
14.1.9 Static Semantics: IsAnonymousFunctionDefinition ( production )
14.1.10 Static Semantics: IsConstantDeclaration
14.1.11 Static Semantics: IsFunctionDefinition
14.1.12 Static Semantics: IsSimpleParameterList
14.1.13 Static Semantics: LexicallyDeclaredNames
14.1.14 Static Semantics: LexicallyScopedDeclarations
14.1.15 Static Semantics: VarDeclaredNames
14.1.16 Static Semantics: VarScopedDeclarations
14.1.17 Runtime Semantics: EvaluateBody
14.1.18 Runtime Semantics: IteratorBindingInitialization
14.1.19 Runtime Semantics: InstantiateFunctionObject
14.1.20 Runtime Semantics: Evaluation
14.2 Arrow Function Definitions
14.2.1 Static Semantics: Early Errors
14.2.2 Static Semantics: BoundNames
14.2.3 Static Semantics: Contains
14.2.4 Static Semantics: ContainsExpression
14.2.5 Static Semantics: ExpectedArgumentCount
14.2.6 Static Semantics: HasInitializer
14.2.7 Static Semantics: HasName
14.2.8 Static Semantics: IsSimpleParameterList
14.2.9 Static Semantics: CoveredFormalsList
14.2.10 Static Semantics: LexicallyDeclaredNames
14.2.11 Static Semantics: LexicallyScopedDeclarations
14.2.12 Static Semantics: VarDeclaredNames
14.2.13 Static Semantics: VarScopedDeclarations
14.2.14 Runtime Semantics: IteratorBindingInitialization
14.2.15 Runtime Semantics: EvaluateBody
14.2.16 Runtime Semantics: Evaluation
14.3 Method Definitions
14.3.1 Static Semantics: Early Errors
14.3.2 Static Semantics: ComputedPropertyContains
14.3.3 Static Semantics: ExpectedArgumentCount
14.3.4 Static Semantics: HasComputedPropertyKey
14.3.5 Static Semantics: HasDirectSuper
14.3.6 Static Semantics: PropName
14.3.7 Static Semantics: SpecialMethod
14.3.8 Runtime Semantics: DefineMethod
14.3.9 Runtime Semantics: PropertyDefinitionEvaluation
14.4 Generator Function Definitions
14.4.1 Static Semantics: Early Errors
14.4.2 Static Semantics: BoundNames
14.4.3 Static Semantics: ComputedPropertyContains
14.4.4 Static Semantics: Contains
14.4.5 Static Semantics: HasComputedPropertyKey
14.4.6 Static Semantics: HasDirectSuper
14.4.7 Static Semantics: HasName
14.4.8 Static Semantics: IsConstantDeclaration
14.4.9 Static Semantics: IsFunctionDefinition
14.4.10 Static Semantics: PropName
14.4.11 Runtime Semantics: EvaluateBody
14.4.12 Runtime Semantics: InstantiateFunctionObject
14.4.13 Runtime Semantics: PropertyDefinitionEvaluation
14.4.14 Runtime Semantics: Evaluation
14.5 Class Definitions
14.5.1 Static Semantics: Early Errors
14.5.2 Static Semantics: BoundNames
14.5.3 Static Semantics: ConstructorMethod
14.5.4 Static Semantics: Contains
14.5.5 Static Semantics: ComputedPropertyContains
14.5.6 Static Semantics: HasName
14.5.7 Static Semantics: IsConstantDeclaration
14.5.8 Static Semantics: IsFunctionDefinition
14.5.9 Static Semantics: IsStatic
14.5.10 Static Semantics: NonConstructorMethodDefinitions
14.5.11 Static Semantics: PrototypePropertyNameList
14.5.12 Static Semantics: PropName
14.5.13 Static Semantics: StaticPropertyNameList
14.5.14 Runtime Semantics: ClassDefinitionEvaluation
14.5.15 Runtime Semantics: BindingClassDeclarationEvaluation
14.5.16 Runtime Semantics: Evaluation
14.6 Tail Position Calls
14.6.1 Static Semantics: IsInTailPosition(nonterminal)
14.6.2 Static Semantics: HasProductionInTailPosition
14.6.3 Runtime Semantics: PrepareForTailCall ( )
15 ECMAScript Language: Scripts and Modules
15.1 Scripts
15.1.1 Static Semantics: Early Errors
15.1.2 Static Semantics: IsStrict
15.1.3 Static Semantics: LexicallyDeclaredNames
15.1.4 Static Semantics: LexicallyScopedDeclarations
15.1.5 Static Semantics: VarDeclaredNames
15.1.6 Static Semantics: VarScopedDeclarations
15.1.7 Runtime Semantics: ScriptEvaluation
15.1.8 Runtime Semantics: GlobalDeclarationInstantiation (script, env)
15.1.9 Runtime Semantics: ScriptEvaluationJob ( sourceText )
15.2 Modules
15.2.1 Module Semantics
15.2.2 Imports
15.2.3 Exports
16 Error Handling and Language Extensions
16.1 Forbidden Extensions
17 ECMAScript Standard Built-in Objects
18 The Global Object
18.1 Value Properties of the Global Object
18.1.1 Infinity
18.1.2 NaN
18.1.3 undefined
18.2 Function Properties of the Global Object
18.2.1 eval (x)
18.2.2 isFinite (number)
18.2.3 isNaN (number)
18.2.4 parseFloat (string)
18.2.5 parseInt (string , radix)
18.2.6 URI Handling Functions
18.3 Constructor Properties of the Global Object
18.3.1 Array ( . . . )
18.3.2 ArrayBuffer ( . . . )
18.3.3 Boolean ( . . . )
18.3.4 DataView ( . . . )
18.3.5 Date ( . . . )
18.3.6 Error ( . . . )
18.3.7 EvalError ( . . . )
18.3.8 Float32Array ( . . . )
18.3.9 Float64Array ( . . . )
18.3.10 Function ( . . . )
18.3.11 Int8Array ( . . . )
18.3.12 Int16Array ( . . . )
18.3.13 Int32Array ( . . . )
18.3.14 Map ( . . . )
18.3.15 Number ( . . . )
18.3.16 Object ( . . . )
18.3.17 Proxy ( . . . )
18.3.18 Promise ( . . . )
18.3.19 RangeError ( . . . )
18.3.20 ReferenceError ( . . . )
18.3.21 RegExp ( . . . )
18.3.22 Set ( . . . )
18.3.23 String ( . . . )
18.3.24 Symbol ( . . . )
18.3.25 SyntaxError ( . . . )
18.3.26 TypeError ( . . . )
18.3.27 Uint8Array ( . . . )
18.3.28 Uint8ClampedArray ( . . . )
18.3.29 Uint16Array ( . . . )
18.3.30 Uint32Array ( . . . )
18.3.31 URIError ( . . . )
18.3.32 WeakMap ( . . . )
18.3.33 WeakSet ( . . . )
18.4 Other Properties of the Global Object
18.4.1 JSON
18.4.2 Math
18.4.3 Reflect
19 Fundamental Objects
19.1 Object Objects
19.1.1 The Object Constructor
19.1.2 Properties of the Object Constructor
19.1.3 Properties of the Object Prototype Object
19.1.4 Properties of Object Instances
19.2 Function Objects
19.2.1 The Function Constructor
19.2.2 Properties of the Function Constructor
19.2.3 Properties of the Function Prototype Object
19.2.4 Function Instances
19.3 Boolean Objects
19.3.1 The Boolean Constructor
19.3.2 Properties of the Boolean Constructor
19.3.3 Properties of the Boolean Prototype Object
19.3.4 Properties of Boolean Instances
19.4 Symbol Objects
19.4.1 The Symbol Constructor
19.4.2 Properties of the Symbol Constructor
19.4.3 Properties of the Symbol Prototype Object
19.4.4 Properties of Symbol Instances
19.5 Error Objects
19.5.1 The Error Constructor
19.5.2 Properties of the Error Constructor
19.5.3 Properties of the Error Prototype Object
19.5.4 Properties of Error Instances
19.5.5 Native Error Types Used in This Standard
19.5.6 NativeError Object Structure
20 Numbers and Dates
20.1 Number Objects
20.1.1 The Number Constructor
20.1.2 Properties of the Number Constructor
20.1.3 Properties of the Number Prototype Object
20.1.4 Properties of Number Instances
20.2 The Math Object
20.2.1 Value Properties of the Math Object
20.2.2 Function Properties of the Math Object
20.3 Date Objects
20.3.1 Overview of Date Objects and Definitions of Abstract Operations
20.3.2 The Date Constructor
20.3.3 Properties of the Date Constructor
20.3.4 Properties of the Date Prototype Object
20.3.5 Properties of Date Instances
21 Text Processing
21.1 String Objects
21.1.1 The String Constructor
21.1.2 Properties of the String Constructor
21.1.3 Properties of the String Prototype Object
21.1.4 Properties of String Instances
21.1.5 String Iterator Objects
21.2 RegExp (Regular Expression) Objects
21.2.1 Patterns
21.2.2 Pattern Semantics
21.2.3 The RegExp Constructor
21.2.4 Properties of the RegExp Constructor
21.2.5 Properties of the RegExp Prototype Object
21.2.6 Properties of RegExp Instances
22 Indexed Collections
22.1 Array Objects
22.1.1 The Array Constructor
22.1.2 Properties of the Array Constructor
22.1.3 Properties of the Array Prototype Object
22.1.4 Properties of Array Instances
22.1.5 Array Iterator Objects
22.2 TypedArray Objects
22.2.1 The %TypedArray% Intrinsic Object
22.2.2 Properties of the %TypedArray% Intrinsic Object
22.2.3 Properties of the %TypedArrayPrototype% Object
22.2.4 The TypedArray Constructors
22.2.5 Properties of the TypedArray Constructors
22.2.6 Properties of TypedArray Prototype Objects
22.2.7 Properties of TypedArray Instances
23 Keyed Collection
23.1 Map Objects
23.1.1 The Map Constructor
23.1.2 Properties of the Map Constructor
23.1.3 Properties of the Map Prototype Object
23.1.4 Properties of Map Instances
23.1.5 Map Iterator Objects
23.2 Set Objects
23.2.1 The Set Constructor
23.2.2 Properties of the Set Constructor
23.2.3 Properties of the Set Prototype Object
23.2.4 Properties of Set Instances
23.2.5 Set Iterator Objects
23.3 WeakMap Objects
23.3.1 The WeakMap Constructor
23.3.2 Properties of the WeakMap Constructor
23.3.3 Properties of the WeakMap Prototype Object
23.3.4 Properties of WeakMap Instances
23.4 WeakSet Objects
23.4.1 The WeakSet Constructor
23.4.2 Properties of the WeakSet Constructor
23.4.3 Properties of the WeakSet Prototype Object
23.4.4 Properties of WeakSet Instances
24 Structured Data
24.1 ArrayBuffer Objects
24.1.1 Abstract Operations For ArrayBuffer Objects
24.1.2 The ArrayBuffer Constructor
24.1.3 Properties of the ArrayBuffer Constructor
24.1.4 Properties of the ArrayBuffer Prototype Object
24.1.5 Properties of the ArrayBuffer Instances
24.2 DataView Objects
24.2.1 Abstract Operations For DataView Objects
24.2.2 The DataView Constructor
24.2.3 Properties of the DataView Constructor
24.2.4 Properties of the DataView Prototype Object
24.2.5 Properties of DataView Instances
24.3 The JSON Object
24.3.1 JSON.parse ( text [ , reviver ] )
24.3.2 JSON.stringify ( value [ , replacer [ , space ] ] )
24.3.3 JSON [ @@toStringTag ]
25 Control Abstraction Objects
25.1 Iteration
25.1.1 Common Iteration Interfaces
25.1.2 The %IteratorPrototype% Object
25.2 GeneratorFunction Objects
25.2.1 The GeneratorFunction Constructor
25.2.2 Properties of the GeneratorFunction Constructor
25.2.3 Properties of the GeneratorFunction Prototype Object
25.2.4 GeneratorFunction Instances
25.3 Generator Objects
25.3.1 Properties of Generator Prototype
25.3.2 Properties of Generator Instances
25.3.3 Generator Abstract Operations
25.4 Promise Objects
25.4.1 Promise Abstract Operations
25.4.2 Promise Jobs
25.4.3 The Promise Constructor
25.4.4 Properties of the Promise Constructor
25.4.5 Properties of the Promise Prototype Object
25.4.6 Properties of Promise Instances
26 Reflection
26.1 The Reflect Object
26.1.1 Reflect.apply ( target, thisArgument, argumentsList )
26.1.2 Reflect.construct ( target, argumentsList [, newTarget] )
26.1.3 Reflect.defineProperty ( target, propertyKey, attributes )
26.1.4 Reflect.deleteProperty ( target, propertyKey )
26.1.5 Reflect.enumerate ( target )
26.1.6 Reflect.get ( target, propertyKey [ , receiver ])
26.1.7 Reflect.getOwnPropertyDescriptor ( target, propertyKey )
26.1.8 Reflect.getPrototypeOf ( target )
26.1.9 Reflect.has ( target, propertyKey )
26.1.10 Reflect.isExtensible (target)
26.1.11 Reflect.ownKeys ( target )
26.1.12 Reflect.preventExtensions ( target )
26.1.13 Reflect.set ( target, propertyKey, V [ , receiver ] )
26.1.14 Reflect.setPrototypeOf ( target, proto )
26.2 Proxy Objects
26.2.1 The Proxy Constructor
26.2.2 Properties of the Proxy Constructor
26.3 Module Namespace Objects
26.3.1 @@toStringTag
26.3.2 [ @@iterator ] ( )
Annex A (informative) Grammar Summary
A.1 Lexical Grammar
A.2 Expressions
A.3 Statements
A.4 Functions and Classes
A.5 Scripts and Modules
A.6 Number Conversions
A.7 Universal Resource Identifier Character Classes
A.8 Regular Expressions
Annex B (normative) Additional ECMAScript Features for Web Browsers
B.1 Additional Syntax
B.1.1 Numeric Literals
B.1.2 String Literals
B.1.3 HTML-like Comments
B.1.4 Regular Expressions Patterns
B.2 Additional Built-in Properties
B.2.1 Additional Properties of the Global Object
B.2.2 Additional Properties of the Object.prototype Object
B.2.3 Additional Properties of the String.prototype Object
B.2.4 Additional Properties of the Date.prototype Object
B.2.5 Additional Properties of the RegExp.prototype Object
B.3 Other Additional Features
B.3.1 __proto__ Property Names in Object Initializers
B.3.2 Labelled Function Declarations
B.3.3 Block-Level Function Declarations Web Legacy Compatibility Semantics
B.3.4 FunctionDeclarations in IfStatement Statement Clauses
B.3.5 VariableStatements in Catch blocks
Annex C (informative) The Strict Mode of ECMAScript
Annex D (informative) Corrections and Clarifications in ECMAScript 2015 with Possible Compatibility Impact
Annex E (informative) Additions and Changes That Introduce Incompatibilities with Prior Editions
Bibliography
```