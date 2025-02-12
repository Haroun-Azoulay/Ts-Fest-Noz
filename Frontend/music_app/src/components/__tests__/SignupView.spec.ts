import { afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import SignupView from "@/composables/Authentification/SignupPage.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
import ApiService from '@/services/ApiService';
import HomeView from '@/views/Home/HomeView.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
}));

vi.mock('@/services/ApiService', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('SignupView.vue', () => {
  it('1 - should return true if signup form fields exist', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    const wrapper = mount(SignupView);
    const signupLastname = wrapper.find('[data-test="signupLastname"]');
    const signupFirstname = wrapper.find('[data-test="signupFirstname"]');
    const signupEmail = wrapper.find('[data-test="signupEmail"]');
    const signupCity = wrapper.find('[data-test="signupCity"]');
    const signupPseudo = wrapper.find('[data-test="signupPseudo"]');
    const signupPassword = wrapper.find('[data-test="signupPassword"]');
    const submitSignupForm = wrapper.find('[data-test="submitSignupForm"]');
    expect(signupLastname.exists()).toBe(true);
    expect(signupFirstname.exists()).toBe(true);
    expect(signupEmail.exists()).toBe(true);
    expect(signupCity.exists()).toBe(true);
    expect(signupPseudo.exists()).toBe(true);
    expect(signupPassword.exists()).toBe(true);
    expect(submitSignupForm.exists()).toBe(true);
  });
  it('2 - should redirect to signin page after successful login', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    ApiService.post.mockResolvedValue({
      data: { message: "User created successfully!" },
    });
    const wrapper = mount(SignupView);
    const signupLastname = wrapper.find('[data-test="signupLastname"]');
    const signupFirstname = wrapper.find('[data-test="signupFirstname"]');
    const signupEmail = wrapper.find('[data-test="signupEmail"]');
    const signupCity = wrapper.find('[data-test="signupCity"]');
    const signupPseudo = wrapper.find('[data-test="signupPseudo"]');
    const signupPassword = wrapper.find('[data-test="signupPassword"]');
    const submitSignupForm = wrapper.find('[data-test="submitSignupForm"]');
    signupLastname.setValue("testtest");
    signupFirstname.setValue("testtest");
    signupEmail.setValue("testtest@gmail.com");
    signupCity.setValue("Paris");
    signupPseudo.setValue("testtest");
    signupPassword.setValue("testtest");
    wrapper.vm.request.longitude = -36.0226;
    wrapper.vm.request.latitude = -50.4244;
    wrapper.vm.request.city = "Paris";
    wrapper.vm.cities = [{"nom":"Paris",
      "centre":{"type":"Point",
        "coordinates":[2.347,48.8589]},
        "code":"75056",
        "_score":0.43270345181469244}];
    submitSignupForm.element.disabled = false;
    await submitSignupForm.trigger('click');
    await nextTick();
    expect(mockRouterPush).toHaveBeenCalledWith({ path: '/signin' });
  });
  it('2 - should redirect to signin page after successful login', async () => {
    const mockRouterPush = vi.fn();
    const mockRouterAfterEach = vi.fn();
    useRouter.mockReturnValue({
      push: mockRouterPush,
      afterEach: mockRouterAfterEach,
    });
    ApiService.post.mockResolvedValue({
      data: { message: "User created successfully!" },
    });
    const wrapper = mount(SignupView);
    const signupLastname = wrapper.find('[data-test="signupLastname"]');
    const signupFirstname = wrapper.find('[data-test="signupFirstname"]');
    const signupEmail = wrapper.find('[data-test="signupEmail"]');
    const signupPseudo = wrapper.find('[data-test="signupPseudo"]');
    const signupPassword = wrapper.find('[data-test="signupPassword"]');
    const submitSignupForm = wrapper.find('[data-test="submitSignupForm"]');
    signupLastname.setValue("testtest");
    signupFirstname.setValue("testtest");
    signupEmail.setValue("testtest@gmail.com");
    signupPseudo.setValue("testtest");
    signupPassword.setValue("testtest");
    submitSignupForm.element.disabled = false;
    await submitSignupForm.trigger('click');
    await nextTick();
    expect(mockRouterPush).toHaveBeenCalledTimes(0);
  });
})
