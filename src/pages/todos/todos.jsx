import { Fragment, useCallback, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion as Motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import IconCross from "../../components/common/IconCross";
import IconCheck from "../../components/common/IconCheck";
import IconLogout from "../../components/common/IconLogout";
import IconMoon from "../../components/common/IconMoon";
import IconSun from "../../components/common/IconSun";
import { useFetchTodoQuery } from "./hooks/useFetchTodoQuery";
import { useUpdateTodoMutation } from "./hooks/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "./hooks/useDeleteTodoMutation";
import { useAddTodoMutation } from "./hooks/useAddTodoMutation";
import { useLogout } from "../../hooks/useLogout";
import { useToDoStore, TODO_OPTIONS } from "../../store/useTodoStore";
import { useThemeStore } from "../../store/useThemeStore";

const Todos = () => {
  const { data, isLoading } = useFetchTodoQuery();
  const { selectedMenu } = useToDoStore();
  const { mutate: logout } = useLogout();
  const { theme, toggleTheme } = useThemeStore();

  const displayData = useMemo(() => {
    if (!data) return [];
    if (selectedMenu === TODO_OPTIONS.ALL) {
      return data;
    }
    if (selectedMenu === TODO_OPTIONS.ACTIVE) {
      return data?.filter?.((item) => !item.completed);
    }

    return data?.filter?.((item) => item.completed);
  }, [data, selectedMenu]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-start md:items-center">
      <div className="flex flex-col  w-full px-6 py-9 justify-center">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl text-white tracking-[0.3em]"> TODO </h1>
            <div className="flex flex-row gap-1 text-white">
              <Motion.button
                className="cursor-pointer"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.6 }}
                whileHover={{ scale: 1.4 }}
                onClick={toggleTheme}
              >
                {theme === "light" ? <IconMoon /> : <IconSun />}
              </Motion.button>
              <Motion.button
                className="cursor-pointer"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.6 }}
                whileHover={{ scale: 1.4 }}
                onClick={logout}
              >
                <IconLogout />
              </Motion.button>
            </div>
          </div>

          <Todos.Input />

          <div className="flex flex-col gap-4 pt-4 bg-white  shadow-2xl dark:bg-navy-900">
            <div className="flex flex-col gap-4 h-[62vh] overflow-x-clip overflow-y-auto">
              <AnimatePresence>
                {displayData?.map?.((item) => (
                  <Fragment key={item._id}>
                    <Todos.Item item={item} />
                    <hr className="text-purple-300 dark:text-purple-800" />
                  </Fragment>
                ))}
              </AnimatePresence>
            </div>
            <Todos.Actions />
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = ({ item }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const handleClick = () => {
    let completedVal = item?.completed;

    queryClient.setQueryData(["todos"], (prevData) => {
      return prevData.map((data) => ({
        ...(data._id === item._id
          ? { ...data, completed: !completedVal }
          : data),
      }));
    });
    mutate(
      {
        id: item?._id,
        completed: !item?.completed,
      },
      {
        onError: () => {
          console.log("onError called");
          queryClient.setQueryData(["todos"], (prevData) => {
            return prevData.map((data) => ({
              ...(data._id === item._id
                ? { ...data, completed: !data?.completed }
                : data),
            }));
          });
        },
      }
    );
  };

  const handleDeleteTodo = () => {
    deleteTodo({ id: item?._id });
  };

  return (
    <Motion.div
      className="flex flex-row justify-between px-2"
      initial={{ x: 200 }}
      whileInView={{ x: 0 }}
      transition={{ duration: 0.25 }}
      exit={{ x: -200 }}
    >
      <div className="flex flex-row items-center gap-6">
        <Motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.6 }}
          onClick={handleClick}
          disabled={isPending}
          className={clsx({
            "text-white": true,
            "flex flex-row items-center justify-center": true,
            "w-6 h-6  border-2 border-purple-300 dark:border-purple-800 rounded-full": true,
            "bg-gradient-to-r from-[#55DDFF] to-[#C058F3]": item?.completed,
          })}
        >
          {item.completed && <IconCheck />}
        </Motion.button>
        <Motion.p
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.6 }}
          onClick={handleClick}
          className={clsx({
            "text-preset-1": true,
            "text-gray-300": item?.completed,
            "dark:text-purple-700": item?.completed,
            "line-through": item?.completed,
            "text-navy-850": !item?.completed,
            "dark:text-purple-100": !item?.completed,
          })}
        >
          {item?.title}
        </Motion.p>
      </div>
      <Motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.8 }}
        className={clsx({
          "text-navy-850 cursor-pointer": true,
          "dark:text-purple-800": true,
        })}
        onClick={handleDeleteTodo}
      >
        <IconCross />
      </Motion.button>
    </Motion.div>
  );
};

const Actions = () => {
  const { selectedMenu, setSelectedMenu } = useToDoStore();
  const { data, isLoading } = useFetchTodoQuery();

  const itemsLeft = useMemo(() => {
    if (isLoading) return "-";

    return data?.filter?.((item) => !item.completed).length;
  }, [data, isLoading]);
  return (
    <div className="flex flex-row justify-between text-purple-600 items-center pb-4 px-2">
      <p className="text-preset-4">{itemsLeft} items left</p>
      <div className="flex flex-row gap-4">
        <button
          className={clsx({
            "text-blue-500": selectedMenu === TODO_OPTIONS.ALL,
            "text-preset-2": true,
          })}
          onClick={() => {
            setSelectedMenu(TODO_OPTIONS.ALL);
          }}
        >
          All
        </button>
        <button
          className={clsx({
            "text-blue-500": selectedMenu === TODO_OPTIONS.ACTIVE,
            "text-preset-2": true,
          })}
          onClick={() => {
            setSelectedMenu(TODO_OPTIONS.ACTIVE);
          }}
        >
          Active
        </button>
        <button
          className={clsx({
            "text-blue-500": selectedMenu === TODO_OPTIONS.COMPLETED,
            "text-preset-2": true,
          })}
          onClick={() => {
            setSelectedMenu(TODO_OPTIONS.COMPLETED);
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

const Input = () => {
  const queryClient = useQueryClient();
  const formRef = useRef("");
  const { mutate, isPending } = useAddTodoMutation();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(formRef.current);

      const todo = formData.get("todo");

      if (todo) {
        mutate(todo, {
          onSuccess: (data) => {
            queryClient.setQueryData(["todos"], (old = []) => [...old, data]);
            if (formRef.current) formRef.current.reset();
          },
        });
      }
    },
    [mutate, queryClient]
  );

  return (
    <div className="px-6 py-4 bg-white shadow-2xl  dark:bg-navy-900">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex flex-row w-full"
      >
        <input
          className={clsx({
            "text-navy-850 placeholder-gray-600": true,
            "grow dark:placeholder-gray-600 dark:text-purple-100 text-preset-1": true,
            "outline-0": true,
          })}
          id="todo"
          name="todo"
        />
        <button
          className={clsx("text-navy-850")}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <IconCheck />
          )}
        </button>
      </form>
    </div>
  );
};

Todos.Item = Item;
Todos.Input = Input;
Todos.Actions = Actions;
export default Todos;
