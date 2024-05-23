import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onValid = (data) => {
    console.log(data);
  };

  return (
    <div style={{ width: "500px", margin: "0 auto", marginTop: "200px" }}>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("id", {
            required: "아이디를 입력해 주세요.",
            minLength: {
              value: 5,
              message: "아이디는 5글자 이상이어야 합니다.",
            },
          })}
          type="text"
          placeholder="id"
        />
        <span style={{ color: "red" }}>{errors?.id?.message}</span>
        <input
          {...register("email", {
            required: { value: true, message: "이메일을 입력해 주세요." },
          })}
          type="email"
          placeholder="email"
        />
        <span style={{ color: "red" }}>{errors?.email?.message}</span>

        <button onClick={() => reset()}>제출</button>
      </form>
    </div>
  );
}
