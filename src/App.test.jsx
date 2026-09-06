import React from 'react';
import {act, fireEvent, render, renderHook, screen, waitFor, within} from '@testing-library/react';
import App from './App';
import useSubmit from './hooks/useSubmit';

const message='I would like to discuss a frontend project with you.';
function fillForm() {
 fireEvent.change(screen.getByLabelText('Name'), {target:{value:'Ada'}});
 fireEvent.change(screen.getByLabelText('Email Address'), {target:{value:'ada@example.test'}});
 fireEvent.change(screen.getByLabelText('Your message'), {target:{value:message}});
}
afterEach(()=>{jest.restoreAllMocks();jest.useRealTimers();});
test('renders the real provider, portfolio content and four project image cards',()=>{
 render(<App/>);
 for(const title of ['Hello, I am Thomas!','A frontend developer','specialised in React','Featured Projects','Contact me'])expect(screen.getByRole('heading',{name:title})).toBeInTheDocument();
 for(const title of ['React Space','React Infinite Scroll','Photo Gallery','Event planner'])expect(screen.getByRole('img',{name:title})).toHaveAttribute('src','test-image.jpg');
 expect(screen.getByText('Thomas • © 2024')).toBeInTheDocument();
});
test('project and contact navigation call smooth scroll without root navigation',()=>{
 render(<App/>);
 for(const [label,id] of [['Projects','projects-section'],['Contact Me','contactme-section']]){
  const scroll=jest.fn();document.getElementById(id).scrollIntoView=scroll;
  fireEvent.click(screen.getByRole('link',{name:label}));expect(scroll).toHaveBeenCalledWith({behavior:'smooth',block:'start'});
  expect(screen.getByRole('link',{name:label})).toHaveAttribute('href','#'+id);
 }
});
test('social links have accessible names and the original destination',()=>{
 render(<App/>);expect(screen.getByRole('link',{name:'Email'})).toHaveAttribute('href','mailto:hello@thomasscheiber.com');
 expect(screen.getByRole('link',{name:'GitHub'})).toHaveAttribute('href','https://github.com/');
});
test('empty contact fields reject submission and show three required messages',async()=>{
 const random=jest.spyOn(Math,'random');render(<App/>);random.mockClear();fireEvent.click(screen.getByRole('button',{name:'Submit'}));
 await waitFor(()=>expect(screen.getAllByText('Required')).toHaveLength(3));expect(random).not.toHaveBeenCalled();expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});
test('invalid email and short message report validation failures',async()=>{
 render(<App/>);fillForm();fireEvent.change(screen.getByLabelText('Email Address'),{target:{value:'wrong'}});fireEvent.blur(screen.getByLabelText('Email Address'));
 fireEvent.change(screen.getByLabelText('Your message'),{target:{value:'short'}});fireEvent.blur(screen.getByLabelText('Your message'));
 await waitFor(()=>expect(screen.getByText('Invalid email address')).toBeInTheDocument());expect(await screen.findByText('Must be at least 25 characters')).toBeInTheDocument();
});
test('successful simulated submission waits, prevents duplicates, shows submitted name and resets',async()=>{
 jest.spyOn(Math,'random').mockReturnValue(.75);render(<App/>);fillForm();fireEvent.click(screen.getByRole('button',{name:'Submit'}));
 await waitFor(()=>expect(screen.getByRole('button',{name:/Submit/})).toBeDisabled());expect(screen.getByLabelText('Name')).toHaveValue('Ada');
 const dialog=await screen.findByRole('alertdialog',{}, {timeout:4000});expect(within(dialog).getByText('All good!')).toBeInTheDocument();expect(within(dialog).getByText(/Thanks for your submission Ada/)).toBeInTheDocument();expect(screen.getByLabelText('Name')).toHaveValue('');
 fireEvent.click(within(dialog).getByRole('button',{name:'Close'}));await waitFor(()=>expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
});
test('failed simulated submission displays error and retains all entered values',async()=>{
 jest.spyOn(Math,'random').mockReturnValue(.25);render(<App/>);fillForm();fireEvent.click(screen.getByRole('button',{name:'Submit'}));
 const dialog=await screen.findByRole('alertdialog',{}, {timeout:4000});expect(within(dialog).getByText('Oops!')).toBeInTheDocument();expect(within(dialog).getByText('Something went wrong, please try again later!')).toBeInTheDocument();
 expect(screen.getByLabelText('Name')).toHaveValue('Ada');expect(screen.getByLabelText('Email Address')).toHaveValue('ada@example.test');expect(screen.getByLabelText('Your message')).toHaveValue(message);
});
test('default enquiry selection agrees with the form value',()=>{
 render(<App/>);expect(screen.getByLabelText('Type of enquiry')).toHaveValue('hireMe');
});
test('hook completes the simulated success with the submitted values and no network',async()=>{
 jest.useFakeTimers();jest.spyOn(Math,'random').mockReturnValue(.75);const {result}=renderHook(()=>useSubmit());let pending;
 act(()=>{pending=result.current.submit({firstName:'Ada'});});expect(result.current.isLoading).toBe(true);
 await act(async()=>{await jest.advanceTimersByTimeAsync(2000);await pending;});expect(result.current.response).toEqual({type:'success',message:'Thanks for your submission Ada, we will get back to you shortly!'});expect(result.current.isLoading).toBe(false);
});
test('hook returns the simulated error after the same bounded delay',async()=>{
 jest.useFakeTimers();jest.spyOn(Math,'random').mockReturnValue(.25);const {result}=renderHook(()=>useSubmit());let pending;
 act(()=>{pending=result.current.submit({firstName:'Ada'});});await act(async()=>{await jest.advanceTimersByTimeAsync(2000);await pending;});expect(result.current.response.type).toBe('error');expect(result.current.isLoading).toBe(false);
});
test('duplicate pending hook submissions share one result and do not start another simulation',async()=>{
 jest.useFakeTimers();const random=jest.spyOn(Math,'random').mockReturnValue(.75);const {result}=renderHook(()=>useSubmit());random.mockClear();let first,second;
 act(()=>{first=result.current.submit({firstName:'Ada'});second=result.current.submit({firstName:'Other'});});expect(first).toBe(second);expect(random).toHaveBeenCalledTimes(1);
 await act(async()=>{await jest.advanceTimersByTimeAsync(2000);await first;});expect(result.current.response.message).toContain('Ada');
});
test('a failed hook submission can retry successfully with a new name',async()=>{
 jest.useFakeTimers();const random=jest.spyOn(Math,'random').mockReturnValue(.25);const {result}=renderHook(()=>useSubmit());let pending;
 act(()=>{pending=result.current.submit({firstName:'Ada'});});await act(async()=>{await jest.advanceTimersByTimeAsync(2000);await pending;});expect(result.current.response.type).toBe('error');
 random.mockReturnValue(.75);act(()=>{pending=result.current.submit({firstName:'Grace'});});await act(async()=>{await jest.advanceTimersByTimeAsync(2000);await pending;});expect(result.current.response.type).toBe('success');expect(result.current.response.message).toContain('Grace');
});
